import { useState, useContext } from 'react';
import ProductPopup from './ProductPopup';
import YesNoPopup from '../../Common/Popup/YesNoPopup'
import { FetchContext } from '../../../context/FetchContext';
import { ProductContext } from '../../../context/ProductContext';
import { IoMdPricetag } from 'react-icons/io';
import { MdAddCircle, MdEdit, MdFindInPage, MdDelete } from 'react-icons/md';
import './DetailHeader.css'

function DetailHeader({ products, setProducts }) {
    const fetchContext = useContext(FetchContext);
    const { setSearchPage, productId, symbol, comments, sale, img, category } = useContext(ProductContext);

    const [addPopup, setAddPopup] = useState(false);
    const [addPopupError, setAddPopupError] = useState('');
    const [deletePopup, setDeletePopup] = useState(false);
    const [deletePopupError, setDeletePopupError] = useState('');

    async function addProduct(formData) {
        try {
            const { data } = await fetchContext.authAxios.post(`/products/add/${category}`, {...formData, productId});
            setProducts([...products, {...formData, id: data[0].productPremadeId}]);
            setAddPopup(false);
        }
        catch (error) {
            setAddPopupError('Wystąpił błąd podczas dodawania produktu 😒');
            console.log(error);
        }
    }

    async function deleteProduct() {
        try {
            const { data } = await fetchContext.authAxios.delete(`/products/delete/${category}/all/${productId}`);
            if (data.rowCount) {
                setDeletePopup(false);
                setSearchPage(true);
            }
        }
        catch (error) {
            setDeletePopupError('Wystąpił błąd podczas usuwania produktu 😒');
            console.log(error);
        }
    }

    function openInShop() {
        let urlSymbol = encodeURI(symbol).replace('/', '[back]');
        let url = `https://abcfirany.pl/szukaj.html/szukaj=${urlSymbol}/opis=nie/nrkat=tak/kodprod=tak`;
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
    <>
        <ProductPopup
            trigger={addPopup}
            closePopup={() => {setAddPopup(false); setAddPopupError('')}}
            onYes={addProduct}
            okButtonText='Dodaj'
            labelText='Dodawanie produktu'
            errorMessage={addPopupError}
        />
        <YesNoPopup
            trigger={deletePopup}
            closePopup={() => {setDeletePopup(false); setDeletePopupError('')}}
            onYes={deleteProduct}
            message='Czy na pewno chcesz usunąć ten produkt?'
            errorMessage={deletePopupError}
        />

        <div className="detail-header">
            <img src={img} alt={symbol} />
            <div className="detail-description">
                <div className="symbol">
                    <h1>{symbol}</h1>
                    <MdEdit className="edit" onClick={()=>console.log('edit')}/>
                </div>
                {sale && <p className="sale"><IoMdPricetag/>Wyprzedaż</p>}
                <p>{comments}</p>
                <div className="product-options">
                    <div className="option" onClick={() => setAddPopup(true)}><MdAddCircle />Dodaj nowy produkt</div>
                    <div className="option" onClick={openInShop}><MdFindInPage/>Wyszukaj na sklepie</div>
                    <div className="option" onClick={() => setDeletePopup(true)}><MdDelete/>Usuń produkt</div>
                </div>
            </div>
        </div>
    </>
    )
}

export default DetailHeader;