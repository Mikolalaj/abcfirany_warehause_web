import { useState, useContext } from 'react';
import ProductPopup from './ProductPopup';
import { FetchContext } from '../../../context/FetchContext';
import { ProductContext } from '../../../context/ProductContext';
import { IoMdPricetag } from 'react-icons/io';
import { MdAddCircle } from 'react-icons/md';
import './DetailHeader.css'

function DetailHeader({ products, setProducts }) {
    const fetchContext = useContext(FetchContext);
    const { productId, symbol, comments, sale, img, category } = useContext(ProductContext);

    const [addPopup, setAddPopup] = useState(false);
    const [editPopupError, setEditPopupError] = useState('');

    async function addProduct(formData) {
        try {
            const { data } = await fetchContext.authAxios.post(`/products/add/${category}`, {...formData, productId});
            setProducts([...products, {...formData, id: data[0].productPremadeId}]);
            setAddPopup(false);
        }
        catch (error) {
            setEditPopupError('Wystąpił błąd podczas dodawania produktu 😒');
            console.log(error);
        }
    }

    return (
    <>
        <ProductPopup
            trigger={addPopup}
            closePopup={() => {setAddPopup(false); setEditPopupError('')}}
            onYes={addProduct}
            okButtonText='Dodaj'
            labelText='Dodawanie produktu'
            errorMessage={editPopupError}
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