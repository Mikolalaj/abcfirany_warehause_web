
import { Grid } from "@material-ui/core";
import { useState, useContext } from "react";
import ManageIcons from "./ManageIcons";
import { ProductContext } from "../../../context/ProductContext";

function DetailPremade({ products }) {
    const { symbol } = useContext(ProductContext);
    const [productsList, setProductsList] = useState(products);

    return (
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
                    <ManageIcons
                        product={product}
                        productsList={productsList}
                        setProductsList={setProductsList}
                    />
                </Grid>
            </Grid>
        ))}
        </div>
    </div>
    )
}

export default DetailPremade;