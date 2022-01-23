import SearchProducts from '../components/Search/SearchProducts';
import Detail from '../components/Products/Detail/Detail';
import { useParams } from 'react-router-dom';

function ProductPage() {
    const { category, productId } = useParams();

    return (
    <>
        <div>
            <h1>Wyszukiwanie produktów</h1>
            <SearchProducts />
        </div>
        <Detail category={category} productId={productId}/>
    </>
    )
}

export default ProductPage;