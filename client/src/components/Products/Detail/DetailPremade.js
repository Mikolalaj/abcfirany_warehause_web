import { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { Grid } from "@material-ui/core";
import ManageIcons from "./ManageIcons";

function DetailPremade() {
    const { childProducts } = useContext(ProductContext);
    
    return (
    <div className='products-data'>
        <Grid container spacing={1}>
            <Grid item xs={1}>
                <div className="header">Wymiar</div>
            </Grid>
            <Grid item xs={1}>
                <div className="header">Ilość (szt.)</div>
            </Grid>
            <Grid item xs={1}>
                <div className="header">Półka</div>
            </Grid>
            <Grid item xs={3}>
                <div className="header">Wykończenie</div>
            </Grid>
            <Grid item xs={5}>
                <div className="header">Uwagi</div>
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>
        <div className="data-rows">
        {childProducts.map((product, index) => (
            <Grid key={product.id} className={`row ${index%2===0 ? 'even' : 'odd'}`} container spacing={1}>
                <Grid item xs={1}>
                    <div className="data">{product.size}</div>
                </Grid>
                <Grid item xs={1}>
                    <div className="data">{product.amount}</div>
                </Grid>
                <Grid item xs={1}>
                    <div className="data">{product.shelving}-{product.column}-{product.shelf}</div>
                </Grid>
                <Grid item xs={3}>
                    <div className="data">{product.finish}</div>
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

export default DetailPremade;