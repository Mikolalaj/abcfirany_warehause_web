import Product from './Product';
import './ProductsList.css';

function ProductsList({ products }) {
    return (
    <div className='products'>
        {products.map(product => <div key={product.productId}>
            {product.meterCount > 0 && <Product key={product.productId + '1'} {...product} category='meter' />}
            {product.premadeCount > 0 && <Product key={product.productId + '2'} {...product} category='premade' />}
            {product.pillowsCount > 0 && <Product key={product.productId + '3'} {...product} category='pillow' />}
            {product.towelsCount > 0 && <Product key={product.productId + '4'} {...product} category='towel' />}
        </div>)}
    </div>
    )
}

export default ProductsList;