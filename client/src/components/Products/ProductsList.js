import Product from './Product';
import { useContext, useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FetchContext } from '../../context/FetchContext';
import './ProductsList.css';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function ProductsList() {
    const [ searchResult, setSearchResult ] = useState([]);
    const { authAxios } = useContext(FetchContext);

    const query = useQuery();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await authAxios.get('products/search', {
                    params: {
                        searchSymbol: searchSymbol
                    }
                });
                setSearchResult(data);
            } catch ({ response: {data: {message}} }) {
                console.log(message);
            }
        }
        
        const searchSymbol = query.get('symbol');
        if (searchSymbol) {
            fetchData()
        }
    }, [query.get('symbol')]);


    return (
    <div className='products'>
        {searchResult.map(product => <div key={product.productId}>
            {product.meterCount > 0 && <Product key={product.productId + '1'} {...product} category='meter' />}
            {product.premadeCount > 0 && <Product key={product.productId + '2'} {...product} category='premade' />}
            {product.pillowsCount > 0 && <Product key={product.productId + '3'} {...product} category='pillow' />}
            {product.towelsCount > 0 && <Product key={product.productId + '4'} {...product} category='towel' />}
        </div>)}
    </div>
    )
}

export default ProductsList;