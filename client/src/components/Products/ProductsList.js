import Product from './Product';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import './ProductsList.css';

function ProductsList() {
    const { searchResult } = useContext(ProductContext);
    return (
    <div className='products'>
        {searchResult.map(product => <div key={product.productId}>
            {product.meterCount > 0 && <Product key={product.productId + '1'} {...product} category='meter' />}
            {product.premadeCount > 0 && <Product key={product.productId + '2'} {...product} category='premade' />}
            {product.pillowsCount > 0 && <Product key={product.productId + '3'} {...product} category='pillow' />}
            {product.towelsCount > 0 && <Product key={product.productId + '4'} {...product} category='towel' />}
        </div>)}
    </div>
    )
}

export default ProductsList;