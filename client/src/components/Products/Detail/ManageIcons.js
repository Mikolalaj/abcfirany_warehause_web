
import { MdDelete, MdEdit } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";
import { FetchContext } from "../../../context/FetchContext";
import { useContext, useState } from "react";
import YesNoPopup from "../../Common/Popup/YesNoPopup";
import CutPopup from "./CutPopup";

function ManageIcons({ product, productsList, setProductsList, category }) {
    const fetchContext = useContext(FetchContext);

    const [deletePopup, setDeletePopup] = useState(false);
    const [deletePopupError, setDeletePopupError] = useState('');

    async function deleteProduct() {
        try {
            const {data: { rowCount }} = await fetchContext.authAxios.delete(`/products/delete/${category.toLowerCase()}/${product.productId}`);
            if (rowCount) {
                let products = productsList.filter(function(product) {
                    return product.id !== product.productId;
                });
                setDeletePopup(false);
                setProductsList(products);
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
                const {data: { rowCount }} = await fetchContext.authAxios.delete(`/products/delete/${category.toLowerCase()}/${product.id}`);
                if (rowCount) {
                    let products = productsList.filter(function(product) {
                        return product.id !== product.id;
                    });
                    setCutPopup(false);
                    setProductsList(products);
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
                const {data: { rowCount }} = await fetchContext.authAxios.put(`/products/take/${category.toLowerCase()}`, {
                    productPremadeId: product.id,
                    newAmount: product.amount - amount
                });
                console.log(rowCount);
                if (rowCount) {
                    let products = productsList.filter(function(product) {
                        if (product.id === product.id) {
                            product.amount = product.amount - amount;
                        }
                        return product;
                    });
                    setCutPopup(false);
                    setProductsList(products);
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

    return (
    <>
        <YesNoPopup 
            trigger={deletePopup}
            closePopup={() => setDeletePopup(false)}
            message='Czy na pewno chcesz usunąć ten produkt?'
            errorMessage={deletePopupError}
            onYes={deleteProduct}
            onNo={() => {setDeletePopup(false); setDeletePopupError('')}}
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
            <MdEdit className="edit"/>
            <MdDelete className="delete" onClick={()=>setDeletePopup(true)}/>
        </div>
    </>
    )
}

export default ManageIcons;