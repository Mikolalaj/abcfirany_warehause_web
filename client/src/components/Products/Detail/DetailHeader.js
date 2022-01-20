import { useState } from 'react';
import ProductPopup from './ProductPopup';
import './DetailHeader.css'
import { IoMdPricetag } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';

function DetailHeader({ symbol, comments, sale, img }) {
    const [addPopup, setAddPopup] = useState(false);

    function addProduct(formData) {
        console.log(formData);
    }

    return (
    <>
        <ProductPopup
            trigger={addPopup}
            closePopup={() => setAddPopup(false)}
            onYes={addProduct}
            okButtonText='Dodaj'
            labelText='Dodawanie produktu'
            symbol={symbol}
        />
        <div className="detail-header">
            <img src={img} alt={symbol} />
            <div className="detail-description">
                <h1>{symbol}</h1>
                {sale && <p className="sale"><IoMdPricetag/>Wyprzedaż</p>}
                <p>{comments}</p>
                <div className="add-product" onClick={() => setAddPopup(true)}><MdAddCircle />Dodaj nowy produkt</div>
            </div>
        </div>
    </>
    )
}

export default DetailHeader;