
import { Grid } from "@material-ui/core";
import { useState } from "react";
import ManageIcons from "./ManageIcons";

function DetailPremade({ products, symbol }) {
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
                        product={{...product, ...{symbol}}}
                        productsList={productsList}
                        setProductsList={setProductsList}
                        category='premade'
                    />
                </Grid>
            </Grid>
        ))}
        </div>
    </div>
    )
}

export default DetailPremade;