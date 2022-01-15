import Product from './Product';
import './ProductsList.css';

function ProductsList({ products }) {
    return (
    <div className='products'>
        {products.map(product => <div key={product.productId}>
            {product.meterCount > 0 && <Product key={product.productId + '1'} {...product} category='Meter' />}
            {product.premadeCount > 0 && <Product key={product.productId + '2'} {...product} category='Premade' />}
            {product.pillowsCount > 0 && <Product key={product.productId + '3'} {...product} category='Pillow' />}
            {product.towelsCount > 0 && <Product key={product.productId + '4'} {...product} category='Towel' />}
        </div>)}
    </div>
    )
}

export default ProductsList;