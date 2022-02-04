import { useState, useContext } from 'react';
import ProductPopup from './Popups/ProductPopup';
import ParentProductPopup from './Popups/ParentProductPopup';
import YesNoPopup from '../../Common/Popup/YesNoPopup'
import { FetchContext } from '../../../context/FetchContext';
import { ProductContext } from '../../../context/ProductContext';
import { IoMdPricetag } from 'react-icons/io';
import { MdAddCircle, MdEdit, MdFindInPage, MdDelete } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import './DetailHeader.css'

function DetailHeader() {
    const { authAxios } = useContext(FetchContext);
    const { childProducts, setChildProducts, product, setProduct } = useContext(ProductContext);
    const { category, productId, img, sale, comments, symbol } = product;
    
    const [editPopup, setEditPopup] = useState(false);
    const [editPopupError, setEditPopupError] = useState('');
    const [addPopup, setAddPopup] = useState(false);
    const [addPopupError, setAddPopupError] = useState('');
    const [deletePopup, setDeletePopup] = useState(false);
    const [deletePopupError, setDeletePopupError] = useState('');

    async function editProduct(formData) {
        try {
            const { data: { rowCount } } = await authAxios.put('/products/update', {
                productId,
                symbol: formData.symbol,
                image: formData.image,
                sale: formData.sale,
                comments: formData.comments
            });
            if (rowCount) {
                setProduct({
                    ...product,
                    symbol: formData.symbol,
                    img: formData.image,
                    sale: formData.sale,
                    comments: formData.comments
                })
                setEditPopup(false);
            } else {
                setEditPopupError('Wystąpił błąd podczas edycji produktu');
            }
        } catch ({ response: { data: { message } } }) {
            console.log(message)
            setEditPopupError(message);
        }
    }

    async function addProduct(formData) {
        console.log(formData)
        try {
            const { data } = await authAxios.post(`/products/${category}/add`, {...formData, productId: productId});
            setChildProducts([...childProducts, {...formData, id: data[0].premadeId}]);
            setAddPopup(false);
        }
        catch (error) {
            setAddPopupError('Wystąpił błąd podczas dodawania produktu 😒');
            console.log(error);
        }
    }

    async function deleteProduct() {
        try {
            const { data } = await authAxios.delete(`/products/${category}/delete/all/${productId}`);
            if (data.rowCount) {
                const newSearchResult = childProducts.filter(product => product.productId !== productId);
                setChildProducts(newSearchResult);
                setDeletePopup(false);
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
        <ParentProductPopup
            trigger={editPopup}
            closePopup={() => setEditPopup(false)}
            onYes={editProduct}
            productData={{
                symbol: symbol,
                image: img,
                sale: sale,
                comments: comments
            }}
            errorMessage={editPopupError}
        />
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
            message='Czy na pewno chcesz usunąć wszystkie produkty?'
            errorMessage={deletePopupError}
        />

        <div className='detail-header'>
            <img src={img} alt={symbol} />
            <div className='detail-description'>
                <div className='symbol'>
                    <h1>{symbol}</h1>
                    <MdEdit className='edit' onClick={()=>setEditPopup(true
                    )}/>
                </div>
                {sale && <p className='sale'><IoMdPricetag/>Wyprzedaż</p>}
                <p>{comments}</p>
                <div className='product-options'>
                    <div className='option' onClick={() => setAddPopup(true)}><MdAddCircle />Dodaj nowy produkt</div>
                    <div className='option' onClick={openInShop}><MdFindInPage/>Wyszukaj na sklepie</div>
                    <div className='option' onClick={() => setDeletePopup(true)}><MdDelete/>Usuń produkt</div>
                </div>
            </div>
            <div className='options'>
                <BsThreeDots />
            </div>
        </div>
    </>
    )
}

export default DetailHeader;