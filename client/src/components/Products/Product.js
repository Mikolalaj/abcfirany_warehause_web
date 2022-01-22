import "./Product.css";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { IoMdPricetag } from "react-icons/io";

function Product(props) {
    const { symbol, productId, comments, sale, img, category } = props;
    const { setSearchPage, setProductData } = useContext(ProductContext);

    function category_name(category) {
        if (category === 'pillow') {
            return 'Poszewki'
        } else if (category === 'premade') {
            return 'Gotowe'
        } else if (category === 'meter') {
            return 'Metraż'
        } else if (category === 'towel') {
            return 'Ręczniki'
        }
    }

    function handleProductClick() {
        setProductData(props)
        setSearchPage(false)
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