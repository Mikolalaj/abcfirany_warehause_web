import Detail from '../components/Products/Detail/Detail';
import { ProductProvider } from '../context/ProductContext';

function ProductPage() {

    return (
    <ProductProvider>
        <Detail />
    </ProductProvider>
    )
}

export default ProductPage;