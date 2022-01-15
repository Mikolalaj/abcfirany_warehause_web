import "./Product.css";

import Detail from "./Detail/Detail";
import Popup from "../Popup/Popup";

import { useState } from "react";

import { IoMdPricetag } from "react-icons/io";

function Product({ symbol, productId, comments, sale, img, category }) {

    const [showDetail, setShowDetail] = useState(false);

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

    return (
        <>
        <Popup trigger={showDetail} closePopup={()=>setShowDetail(false)}>
            <Detail productId={productId} category={category} />
        </Popup>
        <div onClick={()=>setShowDetail(true)} className={`product ${category}`} key={productId}>
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
        </>
    );
}

export default Product;