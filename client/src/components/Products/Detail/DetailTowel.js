
import { Grid } from "@material-ui/core";
import { MdDelete, MdEdit, MdFileCopy } from "react-icons/md";

function DetailTowel({ products }) {

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
                    <div className="data">{product.size}</div>
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
                    <div className="icons">
                        <MdDelete className="delete"/>
                        <MdEdit className="edit"/>
                        <MdFileCopy className="copy"/>
                    </div>
                </Grid>
            </Grid>
        ))}
        </div>
    </div>
    )
}

export default DetailTowel;