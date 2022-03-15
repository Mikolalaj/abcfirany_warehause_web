import { useState } from 'react';
import './SearchInput.css'
import { MdClose, MdOutlineSearch } from 'react-icons/md';

function SearchInput({ onSearch, children }) {
    const [searchSymbol, setSearchSymbol] = useState('');

    function updateSymbol(event) {
        setSearchSymbol(event.target.value);
    }

    return (
    <>
        <form onSubmit={(event) => {onSearch(searchSymbol); event.preventDefault()}} className='search'>
            <div className='search-icon left'><MdOutlineSearch /></div>
            <input type='text' placeholder={children} value={searchSymbol} onChange={updateSymbol}/>
            <div onClick={()=>setSearchSymbol('')} className={`search-icon right ${searchSymbol !== '' ? 'visible' : ''}`}><MdClose /></div>
            <button type='submit'>Szukaj</button>
        </form>
    </>
    )
}

export default SearchInput;