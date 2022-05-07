import ProductsEnum from './ProductsEnum';
import { useHistory } from 'react-router-dom';
import './Product.css';

function Product({ symbol, productId, img, category }) {
    const history = useHistory();

    function categoryName(category) {
        if (category === ProductsEnum.pillow) {
            return 'Poszewki'
        } else if (category === ProductsEnum.premade) {
            return 'Gotowe'
        } else if (category === ProductsEnum.meter) {
            return 'Metraż'
        } else if (category === ProductsEnum.towel) {
            return 'Ręczniki'
        }
    }

    function handleProductClick() {
        history.push(`/product/${category}/${productId}`);
    }
    
    return (
    <div onClick={handleProductClick} className={`product ${category}`} key={productId}>
        <div className='image-wrapper'>
            <img className='image' src={img} alt={symbol} />
        </div>
        <div className='description'>
            <h1 className='symbol'>{symbol}</h1>
            <p className={`category ${category}`}>{categoryName(category)}</p>
        </div>
    </div>
    );
}

export default Product;