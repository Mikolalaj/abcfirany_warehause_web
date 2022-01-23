import { Grid } from "@material-ui/core";
import { useContext } from "react";
import ManageIcons from "../ManageIcons";
import { ProductContext } from "../../../../context/ProductContext";

function TowelListing() {
    const { childProducts } = useContext(ProductContext);

    return (
        <div className='products-listing'>
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
            <Grid item xs={5}>
                <div className="header">Uwagi</div>
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>
        <div className="data-rows">
        {childProducts.map((childProduct, index) => (
            <Grid key={index} className={`row ${index%2===0 ? 'even' : 'odd'}`} container spacing={1}>
                <Grid item xs={2}>
                    <div className="data">{childProduct.size}</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="data">{childProduct.amount}</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="data">{childProduct.shelving}-{childProduct.column}-{childProduct.shelf}</div>
                </Grid>
                <Grid item xs={5}>
                    <div className="data">{childProduct.comments}</div>
                </Grid>
                <Grid item xs={1}>
                    <ManageIcons childProduct={childProduct} />
                </Grid>
            </Grid>
        ))}
        </div>
    </div>
    )
}

export default TowelListing;