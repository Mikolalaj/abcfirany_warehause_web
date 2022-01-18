
import { MdDelete, MdEdit } from "react-icons/md";
import { RiScissors2Fill } from "react-icons/ri";
import { FetchContext } from "../../../context/FetchContext";
import { useContext, useState } from "react";
import YesNoPopup from "../../Common/Popup/YesNoPopup";
import CutPopup from "./CutPopup";

function ManageIcons({ productId, productsList, setProductsList, category }) {
    const fetchContext = useContext(FetchContext);

    const [deletePopup, setDeletePopup] = useState(false);
    const [deletePopupError, setDeletePopupError] = useState('');

    async function deleteProduct() {
        try {
            const {data: { rowCount }} = await fetchContext.authAxios.delete(`/products/delete/${category.toLowerCase()}/${productId}`);
            if (rowCount) {
                let products = productsList.filter(function(product) {
                    return product.id !== productId;
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
        console.log('cut cut')
        console.log(amount)
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