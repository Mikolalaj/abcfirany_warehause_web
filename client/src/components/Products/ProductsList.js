import Product from './Product';
import { useMemo, useEffect, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import { useLocation } from 'react-router-dom';
import Loading from '../Common/Loading';
import ProductsEnum from './ProductsEnum';
import './ProductsList.css';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function ProductsList() {
    const [searchResult, setSearchResult] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [ifLoading, setIfLoading] = useState(false);
    const [ifEmpty, setIfEmpty] = useState(false);

    const query = useQuery();

    const [state,,, setParams, setIsReady, refresh] = useAPI('get', 'products/search', {}, false);

    function splitSearchResults(data) {
        let splittedSearchResults = [];
        data.forEach(result => {
            var splitedResult = {
                comments: result.comments,
                img: result.img,
                productId: result.productId,
                sale: result.sale,
                symbol: result.symbol
            } 
            if (result.meterCount > 0) {
                var copySplitedResult = {...splitedResult};
                copySplitedResult.category = ProductsEnum.meter
                splittedSearchResults.push(copySplitedResult);
            }
            if (result.premadeCount > 0) {
                var copySplitedResult = {...splitedResult};
                copySplitedResult.category = ProductsEnum.premade
                splittedSearchResults.push(copySplitedResult);
            }
            if (result.pillowsCount > 0) {
                var copySplitedResult = {...splitedResult};
                copySplitedResult.category = ProductsEnum.pillow
                splittedSearchResults.push(copySplitedResult);
            }
            if (result.towelCount > 0) {
                var copySplitedResult = {...splitedResult};
                copySplitedResult.category = ProductsEnum.towel
                splittedSearchResults.push(copySplitedResult);
            }
        })
        return splittedSearchResults;
    }

    useEffect(() => {
        const searchSymbol = query.get('symbol');
        
        if (searchSymbol) {
            setIfLoading(true);
            setIfEmpty(false);
            setSearchResult([]);
            setParams({
                searchSymbol: searchSymbol
            })
            setIsReady(true);
            refresh();
        }        
    }, [query.get('symbol')]);

    useEffect(() => {
        if (state.isSuccess) {
            setIfLoading(false);
            setIfEmpty(state.data.length === 0);
            setSearchResult(splitSearchResults(state.data));
        }
        else if (state.isError) {
            setIfLoading(false);
            setIfEmpty(false);
            setSearchResult([]);
            setErrorMessage(state.errorMessage);
            console.log(state.errorMessage);
        }
    }, [state]);

    return (
    <>
    {ifLoading ? <Loading /> :
    <div className='results-info'>
        {errorMessage ? <div className='error-message'>{errorMessage}</div> : null}
        {(!errorMessage && ifEmpty) && `Brak wyników dla "${query.get('symbol')}"`}
        {(!errorMessage && searchResult.length > 0) && `Wynik wyszukiwania dla "${query.get('symbol')}"`}
    </div>}
    <div className='products'>
        {searchResult.map((product, index) => {
            return (
                <Product key={index} {...product} category={product.category} />
            )
        })}
    </div>
    </>
    )
}

export default ProductsList;