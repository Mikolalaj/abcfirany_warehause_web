import Product from './Product';
import { useContext, useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FetchContext } from '../../context/FetchContext';
import Loading from '../Common/Loading';
import ProductsEnum from './ProductsEnum';
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
    {ifLoading ? <Loading /> :
    <div className='results-info'>
        {ifEmpty && `Brak wyników dla "${query.get('symbol')}"`}
        {searchResult.length > 0 && `Wynik wyszukiwania dla "${query.get('symbol')}"`}
    </div>}
    <div className='products'>
        {searchResult.map(product => {
            if (product.meterCount > 0) {
                return <Product key={product.productId + '1'} {...product} category={ProductsEnum.meter} />
            }
            else if (product.pillowsCount > 0) {
                return <Product key={product.productId + '2'} {...product} category={ProductsEnum.pillow} />
            }
            else if (product.premadeCount > 0) {
                return <Product key={product.productId + '3'} {...product} category={ProductsEnum.premade} />
            }
            else if (product.towelsCount > 0) {
                return <Product key={product.productId + '4'} {...product} category={ProductsEnum.towel} />
            }
        })}
    </div>
    </>
    )
}

export default ProductsList;