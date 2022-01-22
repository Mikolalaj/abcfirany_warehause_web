
import { Grid } from "@material-ui/core";
import { useContext } from "react";
import ManageIcons from "./ManageIcons";
import { ProductContext } from "../../../context/ProductContext";

function DetailMeter() {
    const { childProducts } = useContext(ProductContext);

    return (
    <div className='products-data'>
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <div className="header">Szer. (cm)</div>
            </Grid>
            <Grid item xs={2}>
                <div className="header">Ilość (m)</div>
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
        {childProducts.map((product, index) => (
            <Grid key={index} className={`row ${index%2===0 ? 'even' : 'odd'}`} container spacing={1}>
                <Grid item xs={2}>
                    <div className="data">{product.width}</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="data">{product.amount}</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="data">{product.shelving}-{product.column}-{product.shelf}</div>
                </Grid>
                <Grid item xs={5}>
                    <div className="data">{product.comments}</div>
                </Grid>
                <Grid item xs={1}>
                    <ManageIcons product={product} />
                </Grid>
            </Grid>
        ))}
        </div>
    </div>
    )
}

export default DetailMeter;