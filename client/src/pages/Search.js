import SearchProducts from '../components/Search/SearchProducts';
import { SearchProvider } from '../context/SearchContext';

function Search() {
    return (
    <SearchProvider>
        <div>
            <h1>Wyszukiwanie produktów</h1>
            <SearchProducts />
        </div>
    </SearchProvider>
    )
}

export default Search;