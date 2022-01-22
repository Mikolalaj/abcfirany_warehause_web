import { useContext, useState } from "react";

import { MdDelete, MdEdit } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";

import { FetchContext } from "../../../context/FetchContext";
import { ProductContext } from "../../../context/ProductContext";

import YesNoPopup from "../../Common/Popup/YesNoPopup";
import CutPopup from "./Popups/CutPopup";
import ProductPopup from "./Popups/ProductPopup";

function ManageIcons({ product }) {
    const fetchContext = useContext(FetchContext);
    const { products, setProducts, category } = useContext(ProductContext);

    const [deletePopup, setDeletePopup] = useState(false);
    const [deletePopupError, setDeletePopupError] = useState('');

    async function deleteProduct() {
        try {
            const {data: { rowCount }} = await fetchContext.authAxios.delete(`/products/delete/${category}/${product.id}`);
            if (rowCount) {
                let newProducts = products.filter(function(prod) {
                    return prod.id !== product.id;
                });
                setDeletePopup(false);
                setProducts(newProducts);
            }
            else {
                setDeletePopupError("Coś poszło nie tak... 😒");
            }
        } catch (error) {
            setDeletePopupError("Coś poszło nie tak... 😒");
            console.log(error);
        }
    }

    const [cutPopup, setCutPopup] = useState(false);
    const [cutPopupError, setCutPopupError] = useState('');

    async function cutProduct(amount) {
        if (amount === 0 || amount === '') {
            setCutPopupError("Podaj ilość!");
            return;
        }
        if (amount < 0) {
            setCutPopupError("Podaj dodatnią ilość!");
            return;
        }
        if (amount > product.amount) {
            setCutPopupError("Nie ma takiej ilości produktu 🙁");
            return;
        }
        if (amount == product.amount) {
            try {
                const {data: { rowCount }} = await fetchContext.authAxios.delete(`/products/delete/${category}/${product.id}`);
                if (rowCount) {
                    let newProducts = products.filter(function(prod) {
                        return prod.id !== product.id;
                    });
                    setCutPopup(false);
                    setProducts(newProducts);
                }
                else {
                    setCutPopupError("Coś poszło nie tak podczas usuwania... 😒");
                }
            } catch (error) {
                setCutPopupError("Coś poszło nie tak podczas usuwania... 😒");
                console.log(error);
            }
        }
        else {
            try {
                const {data: { rowCount }} = await fetchContext.authAxios.put(`/products/take/${category}`, {
                    productPremadeId: product.id,
                    newAmount: product.amount - amount
                });
                console.log(rowCount);
                if (rowCount) {
                    let newProducts = products.filter(function(prod) {
                        if (prod.id === product.id) {
                            prod.amount = product.amount - amount;
                        }
                        return prod;
                    });
                    setCutPopup(false);
                    setProducts(newProducts);
                }
                else {
                    setCutPopupError("Coś poszło nie tak podczas edytowania... 😒");
                }
            } catch (error) {
                setCutPopupError("Coś poszło nie tak podczas edytowania... 😒");
                console.log(error);
            }
        }
    }

    const [editPopup, setEditPopup] = useState(false);
    const [editPopupError, setEditPopupError] = useState('');

    async function editProduct(formData) {
        try {
            const {data: { rowCount }} = await fetchContext.authAxios.put(`/products/update/${category}`, {...formData, productPremadeId: product.id});
            if (rowCount) {
                let newProducts = products.filter(function(prod) {
                    if (prod.id === product.id) {
                        prod.shelving = formData.shelving;
                        prod.column = formData.column;
                        prod.shelf = formData.shelf;
                        prod.size = formData.size;
                        prod.amount = formData.amount;
                        prod.finish = formData.finish;
                        prod.comments = formData.comments;
                    }
                    return prod;
                });
                setEditPopup(false);
                setProducts(newProducts);
            }
            else {
                setEditPopupError("Coś poszło nie tak... 😒");
            }
        } catch (error) {
            setEditPopupError("Coś poszło nie tak... 😒");
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
            closePopup={() => setEditPopup(false)}
            onYes={editProduct}
            okButtonText='Edytuj'
            labelText='Edytowanie produktu'
            productData={product}
            errorMessage={editPopupError}
        />
        <CutPopup
            trigger={cutPopup}
            closePopup={() => setCutPopup(false)}
            message='Podaj ilość produktów do wydania'
            errorMessage={cutPopupError}
            onYes={cutProduct}
            onNo={() => {setCutPopup(false); setCutPopupError('')}}
        />
        <div className="icons" >
            <RiScissors2Fill className="copy" onClick={()=>setCutPopup(true)}/>
            <MdEdit className="edit" onClick={()=>setEditPopup(true)}/>
            <MdDelete className="delete" onClick={()=>setDeletePopup(true)}/>
        </div>
    </>
    )
}

export default ManageIcons;