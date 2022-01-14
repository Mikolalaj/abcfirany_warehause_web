import "./Product.css";

import Detail from "./Detail/Detail";

import { useState } from "react";

import { GiPillow } from "react-icons/gi";
import { FaPoo, FaCannabis, FaDove } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";

function Product({ symbol, product_id, comments, sale, img, category }) {

    const [showDetail, setShowDetail] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    function category_icon(category) {
        switch (category) {
            case "Pillow":
                return <GiPillow />;
            case "Premade":
                return <FaPoo />;
            case "Meter":
                return <FaCannabis />;
            default:
                return <FaDove />;
        }
    }

    function showDetailPage() {
        setShowDetail(true);
        showBackground(true);
    }

    return (
        <>
        {showDetail && <Detail />}
        <div onClick={showDetailPage} className={`product ${category}`} key={product_id}>
            <div className="image-wrapper">
                <img className="image" src={img} alt={symbol} />
            </div>
            <div className="description">
                <IoMdPricetag className={sale ? 'sale visible' : 'sale notvisible'}/>
                <h1 className="symbol">{symbol}</h1>
                <p className="comments">{comments}</p>
                {category_icon(category)}
            </div>
        </div>
        </>
    );
}

export default Product;