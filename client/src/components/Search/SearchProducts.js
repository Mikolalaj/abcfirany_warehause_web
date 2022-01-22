import { useState, useContext } from 'react';
import { FetchContext } from '../../context/FetchContext';
import { ProductContext } from '../../context/ProductContext';
import ProductsList from '../Products/ProductsList';
import Detail from '../Products/Detail/Detail';
import './SearchProducts.css'

function SearchProducts() {
    const fetchContext = useContext(FetchContext);
    const { searchPage, setSearchPage, setSearchResult } = useContext(ProductContext);
    
    const [searchSymbol, setSearchSymbol] = useState('');

    function updateSymbol(event) {
        setSearchSymbol(event.target.value);
    }

    async function searchProducts(event) {
        event.preventDefault();
        try {
            const { data } = await fetchContext.authAxios.get(`/products/search/${searchSymbol}`);
            setSearchResult(data);
            setSearchPage(true);
        } catch ({ response: {data: {message}} }) {
            console.log(message);
        }
    }

    return (
    <>
        <form onSubmit={searchProducts} className='search'>
            <input type="text" placeholder='🔍 Wpisz symbol produktu' value={searchSymbol} onChange={updateSymbol}/>
            <button type='submit'>Szukaj</button>
        </form>
        {searchPage ? <ProductsList /> : <Detail/>}
    </>
    );
}

export default SearchProducts;
