import SearchProducts from '../components/Search/SearchProducts';
import ProductsList from '../components/Products/ProductsList';

function SearchPage() {
    return (
    <>
        <div>
            <h1>Wyszukiwanie produktów</h1>
            <SearchProducts />
        </div>
        <ProductsList />
    </>
    )
}

export default SearchPage;