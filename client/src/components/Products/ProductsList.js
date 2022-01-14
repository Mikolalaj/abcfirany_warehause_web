import Product from './Product';
import './ProductsList.css';

function ProductsList({ products }) {
    return (
    <div className='products'>
        {products.map(product => <Product key={product.product_id} {...product} />)}
    </div>
    )
}

export default ProductsList;