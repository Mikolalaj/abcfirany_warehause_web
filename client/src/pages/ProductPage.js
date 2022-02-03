import Detail from '../components/Products/Detail/Detail';
import { ProductProvider } from '../context/ProductContext';
import { useParams } from 'react-router-dom';

function ProductPage() {
    const { category, productId } = useParams();

    return (
    <ProductProvider>
        <Detail category={category} productId={productId}/>
    </ProductProvider>
    )
}

export default ProductPage;