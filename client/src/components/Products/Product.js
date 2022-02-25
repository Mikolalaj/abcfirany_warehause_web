import './Product.css';
import ProductsEnum from './ProductsEnum';
import { useHistory } from 'react-router-dom';

function Product(props) {
    const history = useHistory();
    const { symbol, productId, img, category } = props;

    function category_name(category) {
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
            <p className={`category ${category}`}>{category_name(category)}</p>
        </div>
    </div>
    );
}

export default Product;