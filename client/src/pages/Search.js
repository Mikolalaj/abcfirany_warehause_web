import SearchProducts from '../components/Search/SearchProducts';
import { ProductProvider } from '../context/ProductContext';

function Search() {
    return (
    <ProductProvider>
        <div>
            <h1>Wyszukiwanie produktów</h1>
            <SearchProducts />
        </div>
    </ProductProvider>
    )
}

export default Search;