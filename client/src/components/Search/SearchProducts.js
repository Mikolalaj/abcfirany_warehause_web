import { useState, useContext } from 'react';
import { FetchContext } from '../../context/FetchContext';
import ProductsList from '../Products/ProductsList';
import Detail from '../Products/Detail/Detail';
import { SearchContext } from '../../context/SearchContext';
import './SearchProducts.css'

function SearchProducts() {
    const fetchContext = useContext(FetchContext);
    const searchContext = useContext(SearchContext);
    
    const [searchSymbol, setSearchSymbol] = useState('');
    const [products, setProducts] = useState([]);

    function updateSymbol(event) {
        setSearchSymbol(event.target.value);
    }

    async function searchProducts(event) {
        event.preventDefault();
        try {
            const { data } = await fetchContext.authAxios.get(`/products/search/${searchSymbol}`);
            setProducts(data);
        } catch ({ response: {data: {message}} }) {
            console.log(message);
        }
    }

    return (
    <>
    <form onSubmit={searchProducts} className='search'>
        <input type="text" placeholder='Symbol produktu' value={searchSymbol} onChange={updateSymbol}/>
        <button type='submit'>Szukaj</button>
    </form>
    {searchContext.searchResults
        ?
        <ProductsList products={products} />
        :
        <Detail {...searchContext.chosenProductData}/>
    }
    </>
    );
}

export default SearchProducts;
