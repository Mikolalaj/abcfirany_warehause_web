import { useState, useContext } from 'react';
import { FetchContext } from '../../context/FetchContext';
import ProductsList from '../Products/ProductsList';
import './Search.css'

function Search() {
    const fetchContext = useContext(FetchContext);

    const [searchSymbol, setSearchSymbol] = useState('');
    const [products, setProducts] = useState([]);

    function updateSymbol(event) {
        setSearchSymbol(event.target.value);
    }

    async function searchProducts(event) {
        event.preventDefault();
        try {
            const { data } = await fetchContext.authAxios.get(`/products/${searchSymbol}`);
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
    <ProductsList products={products} />
    </>
    );
}

export default Search;
