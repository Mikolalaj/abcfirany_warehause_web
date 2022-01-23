import { useState } from 'react';
import './SearchProducts.css'
import { useHistory } from 'react-router-dom';

function SearchProducts() {
    let history = useHistory();
    const [searchSymbol, setSearchSymbol] = useState('');

    function updateSymbol(event) {
        setSearchSymbol(event.target.value);
    }

    return (
    <>
        <form onSubmit={(event)=>{history.push(`/search?symbol=${searchSymbol}`); event.preventDefault()}} className='search'>
            <input type="text" placeholder='🔍 Wpisz symbol produktu' value={searchSymbol} onChange={updateSymbol}/>
            <button type='submit'>Szukaj</button>
        </form>
    </>
    );
}

export default SearchProducts;
