import { useState, useContext } from 'react';
import ProductPopup from './ProductPopup';
import { FetchContext } from '../../../context/FetchContext';
import { ProductContext } from '../../../context/ProductContext';
import './DetailHeader.css'
import { IoMdPricetag } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';

function DetailHeader() {
    const [addPopup, setAddPopup] = useState(false);
    const fetchContext = useContext(FetchContext);
    const { symbol, comments, sale, img } = useContext(ProductContext);

    async function addProduct(formData) {
        const response = await fetchContext.authAxios.post('/products/add', formData);
        console.log(response);
    }

    return (
    <>
        <ProductPopup
            trigger={addPopup}
            closePopup={() => setAddPopup(false)}
            onYes={addProduct}
            okButtonText='Dodaj'
            labelText='Dodawanie produktu'
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