import { useState } from 'react';
import './SearchProducts.css'
import { MdClose, MdOutlineSearch } from 'react-icons/md';
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
            <div className='search-icon left'><MdOutlineSearch /></div>
            <input type='text' placeholder='Wpisz symbol produktu' value={searchSymbol} onChange={updateSymbol}/>
            <div onClick={()=>setSearchSymbol('')} className={`search-icon right ${searchSymbol !== '' ? 'visible' : ''}`}><MdClose /></div>
            <button type='submit'>Szukaj</button>
        </form>
    </>
    );
}

export default SearchProducts;
