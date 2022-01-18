
import { Grid } from "@material-ui/core";
import { MdDelete, MdEdit, MdFileCopy } from "react-icons/md";
import { useState, useContext } from "react";
import YesNoPopup from "../../Common/Popup/YesNoPopup";
import { FetchContext } from "../../../context/FetchContext";

function DetailPremade({ products }) {
    const fetchContext = useContext(FetchContext);
    const [deletePopup, setDeletePopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productsList, setProductsList] = useState(products);

    async function deleteProduct() {
        try {
            const {data: { rowCount }} = await fetchContext.authAxios.delete(`/products/delete/premade/${selectedProduct}`);
            if (rowCount) {
                products = products.filter(function(product) {
                    return product.id !== selectedProduct;
                });
                setProductsList(products);
                setDeletePopup(false);
                setSelectedProduct(null);
            }
            else {
                alert("Coś poszło nie tak podczas usuwania tego produktu 😒");
            }
        } catch (error) {
            alert("Coś poszło nie tak podczas usuwania tego produktu 😒");
            console.log(error);
        }
    }

    return (
    <>
        <YesNoPopup 
            trigger={deletePopup}
            closePopup={() => setDeletePopup(false)}
            message="Czy na pewno chcesz usunąć ten produkt?"
            onYes={deleteProduct}
            onNo={() => setDeletePopup(false)}
        />
        <div className='products-data'>
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <div className="header">Wymiar</div>
            </Grid>
            <Grid item xs={2}>
                <div className="header">Ilość (szt.)</div>
            </Grid>
            <Grid item xs={2}>
                <div className="header">Półka</div>
            </Grid>
            <Grid item xs={2}>
                <div className="header">Wykończenie</div>
            </Grid>
            <Grid item xs={3}>
                <div className="header">Uwagi</div>
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>
        <div className="data-rows">
        {productsList.map((product, index) => (
            <Grid key={product.id} className={`row ${index%2===0 ? 'even' : 'odd'}`} container spacing={1}>
                <Grid item xs={2}>
                    <div className="data">{product.size}</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="data">{product.amount}</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="data">{product.shelving}-{product.column}-{product.shelf}</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="data">{product.finish}</div>
                </Grid>
                <Grid item xs={3}>
                    <div className="data">{product.comments}</div>
                </Grid>
                <Grid item xs={1}>
                    <div className="icons" onClick={()=>setSelectedProduct(product.id)}>
                        <MdDelete className="delete" onClick={()=>setDeletePopup(true)}/>
                        <MdEdit className="edit"/>
                        <MdFileCopy className="copy"/>
                    </div>
                </Grid>
            </Grid>
        ))}
        </div>
    </div>
    </>
    )
}

export default DetailPremade;