import SearchProducts from '../components/Search/SearchProducts';
import Detail from '../components/Products/Detail/Detail';
import { ProductProvider } from '../context/ProductContext';
import { useParams } from 'react-router-dom';

function ProductPage() {
    const { category, productId } = useParams();

    return (
    <>
        <SearchProducts />
        <ProductProvider>
            <Detail category={category} productId={productId}/>
        </ProductProvider>
    </>
    )
}

export default ProductPage;