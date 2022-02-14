import { useContext, useState } from 'react';

import { MdDelete, MdEdit } from 'react-icons/md';
import { RiScissors2Fill } from 'react-icons/ri';

import { ProductContext } from '../../../context/ProductContext';
import { FetchContext } from '../../../context/FetchContext';

import YesNoPopup from '../../Common/Popup/YesNoPopup';
import CutPopup from './Popups/CutPopup';
import ProductPopup from './Popups/ProductPopup';

function ManageIcons({ childProduct }) {
    const { childProducts, setChildProducts, product } = useContext(ProductContext);
    const fetchContext = useContext(FetchContext);

    const [deletePopup, setDeletePopup] = useState(false);
    const [deletePopupError, setDeletePopupError] = useState('');

    async function deleteProduct() {
        try {
            const {data: { rowCount }} = await fetchContext.authAxios.delete(`/products/delete/one/${childProduct.productChildId}`);
            if (rowCount) {
                let newProducts = childProducts.filter(function(product) {
                    return product.productChildId !== childProduct.productChildId;
                });
                setDeletePopup(false);
                setChildProducts(newProducts);
            }
            else {
                setDeletePopupError('Coś poszło nie tak... 😒');
            }
        } catch (error) {
            setDeletePopupError('Coś poszło nie tak... 😒');
            console.log(error);
        }
    }

    const [cutPopup, setCutPopup] = useState(false);
    const [cutPopupError, setCutPopupError] = useState('');

    async function cutProduct(amount) {
        if (amount === '') {
            setCutPopupError('Podaj ilość!');
            return;
        }
        if (amount <= 0) {
            setCutPopupError('Podaj dodatnią ilość!');
            return;
        }
        if (amount > childProduct.amount) {
            setCutPopupError('Nie ma takiej ilości produktu 🙁');
            return;
        }
        if (amount == childProduct.amount) {
            try {
                const {data: { rowCount }} = await fetchContext.authAxios.delete(`/products/delete/one/${childProduct.productChildId}`);
                if (rowCount) {
                    let newProducts = childProducts.filter(function(product) {
                        return product.productChildId !== childProduct.productChildId;
                    });
                    setCutPopup(false);
                    setChildProducts(newProducts);
                }
                else {
                    setCutPopupError('Coś poszło nie tak podczas usuwania... 😒');
                }
            } catch (error) {
                setCutPopupError('Coś poszło nie tak podczas usuwania... 😒');
                console.log(error);
            }
        }
        else {
            try {
                const {data: { rowCount }} = await fetchContext.authAxios.put(`/products/take`, {
                    childProductId: childProduct.productChildId,
                    newAmount: childProduct.amount - amount
                });
                if (rowCount) {
                    let newProducts = childProducts.filter(function(product) {
                        if (product.productChildId === childProduct.productChildId) {
                            product.amount = childProduct.amount - amount;
                        }
                        return product;
                    });
                    setCutPopup(false);
                    setChildProducts(newProducts);
                }
                else {
                    setCutPopupError('Coś poszło nie tak podczas edytowania... 😒');
                }
            } catch (error) {
                setCutPopupError('Coś poszło nie tak podczas edytowania... 😒');
                console.log(error);
            }
        }
    }

    const [editPopup, setEditPopup] = useState(false);
    const [editPopupError, setEditPopupError] = useState('');

    async function editProduct(formData) {
        try {
            let featureId, feature = null;
            if (formData.feature === null) {
                featureId = null;
                feature = ''
            }
            else {
                featureId = formData.feature.value;
                feature = formData.feature.label;
            }
            const requestData = {...formData, featureId, productChildId: childProduct.productChildId}
            const {data: { rowCount }} = await fetchContext.authAxios.put(`/products/${product.category}/update`, requestData);
            if (rowCount) {
                let newProducts = childProducts.filter(function(product) {
                    if (product.productChildId === childProduct.productChildId) {
                        product = Object.assign(product, {...formData, feature});
                    }
                    return product;
                });
                setEditPopup(false);
                setChildProducts(newProducts);
            }
            else {
                setEditPopupError('Coś poszło nie tak... 😒');
            }
        } catch (error) {
            setEditPopupError('Coś poszło nie tak... 😒');
            console.log(error);
        }
    }

    return (
    <>
        <YesNoPopup 
            trigger={deletePopup}
            closePopup={() => {setDeletePopup(false); setDeletePopupError('')}}
            message='Czy na pewno chcesz usunąć ten produkt?'
            errorMessage={deletePopupError}
            onYes={deleteProduct}
        />
        <ProductPopup
            trigger={editPopup}
            closePopup={() => {setEditPopup(false); setEditPopupError('')}}
            onYes={editProduct}
            okButtonText='Edytuj'
            labelText='Edytowanie produktu'
            productData={childProduct}
            errorMessage={editPopupError}
        />
        <CutPopup
            trigger={cutPopup}
            closePopup={() => {setCutPopup(false); setCutPopupError('')}}
            message='Podaj ilość produktów do wydania'
            errorMessage={cutPopupError}
            onYes={cutProduct}
        />
        <div className='icons' >
            <RiScissors2Fill className='copy' onClick={()=>setCutPopup(true)}/>
            <MdEdit className='edit' onClick={()=>setEditPopup(true)}/>
            <MdDelete className='delete' onClick={()=>setDeletePopup(true)}/>
        </div>
    </>
    )
}

export default ManageIcons;