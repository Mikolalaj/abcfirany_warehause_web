
import { Grid } from "@material-ui/core";
import { useState } from "react";
import ManageIcons from "./ManageIcons";

function DetailMeter({ products, symbol }) {
    const [productsList, setProductsList] = useState(products);

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
        {products.map((product, index) => (
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
                    <ManageIcons
                        product={{...product, ...{symbol}}}
                        productsList={productsList}
                        setProductsList={setProductsList}
                        category='meter'
                    />
                </Grid>
            </Grid>
        ))}
        </div>
    </div>
    )
}

export default DetailMeter;