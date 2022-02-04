import Product from './Product';
import { useContext, useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FetchContext } from '../../context/FetchContext';
import Loading from '../Common/Loading';
import './ProductsList.css';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function ProductsList() {
    const [ searchResult, setSearchResult ] = useState([]);
    const [ifLoading, setIfLoading] = useState(false);
    const [ifEmpty, setIfEmpty] = useState(false);
    const { authAxios } = useContext(FetchContext);

    const query = useQuery();

    useEffect(() => {
        async function fetchData() {
            setIfEmpty(false);
            setSearchResult([]);
            try {
                const { data } = await authAxios.get('products/search', {
                    params: {
                        searchSymbol: searchSymbol
                    }
                });
                setSearchResult(data);
                if (data.length) {
                    setIfEmpty(false);
                }
                else {
                    setIfEmpty(true);
                }
                
            } catch ({ response: {data: {message}} }) {
                console.log(message);
            }
            setIfLoading(false);
        }
        
        const searchSymbol = query.get('symbol');
        if (searchSymbol) {
            setIfLoading(true);
            fetchData();
        }
    }, [query.get('symbol')]);


    return (
    <>
    {ifLoading && <Loading />}
    {ifEmpty && <div className='no-results'>Brak wyników</div>}
    <div className='products'>
        {searchResult.map(product => <div key={product.productId}>
            {product.meterCount > 0 && <Product key={product.productId + '1'} {...product} category='meter' />}
            {product.premadeCount > 0 && <Product key={product.productId + '2'} {...product} category='premade' />}
            {product.pillowsCount > 0 && <Product key={product.productId + '3'} {...product} category='pillows' />}
            {product.towelsCount > 0 && <Product key={product.productId + '4'} {...product} category='towels' />}
        </div>)}
    </div>
    </>
    )
}

export default ProductsList;