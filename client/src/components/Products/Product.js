import "./Product.css";
import { useContext } from "react";
import { SearchContext } from '../../context/SearchContext';
import { IoMdPricetag } from "react-icons/io";

function Product(props) {
    const { symbol, productId, comments, sale, img, category } = props;
    const searchContext = useContext(SearchContext);

    function category_name(category) {
        if (category === 'Pillow') {
            return 'Poszewki'
        } else if (category === 'Premade') {
            return 'Gotowe'
        } else if (category === 'Meter') {
            return 'Metraż'
        } else if (category === 'Towel') {
            return 'Ręczniki'
        }
    }

    function handleProductClick() {
        searchContext.setSearchResults(false)
        searchContext.setChosenProductData({...props})
    }

    return (
    <div onClick={handleProductClick} className={`product ${category}`} key={productId}>
        <div className="image-wrapper">
            <img className="image" src={img} alt={symbol} />
        </div>
        <div className="description">
            <IoMdPricetag className={sale ? 'sale visible' : 'sale notvisible'}/>
            <h1 className="symbol">{symbol}</h1>
            <p className="comments">{comments}</p>
            <p className={`category ${category}`}>{category_name(category)}</p>
        </div>
    </div>
    );
}

export default Product;