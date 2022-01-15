import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { MdDelete, MdEdit, MdSearch, MdFileCopy } from "react-icons/md";
import './Detail.css';

function Detail() {

    const data = [
        {
            width: 150,
            amount: 35.5,
            shelf: '2-5-1',
        },
        {
            width: 145,
            amount: 15.25,
            shelf: '2-7-2',
        },
    ]

    return (
    <div className='product-detail'>
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <div className="header">Szer. (cm)</div>
            </Grid>
            <Grid item xs={4}>
                <div className="header">Ilość (m)</div>
            </Grid>
            <Grid item xs={2}>
                <div className="header">Półka</div>
            </Grid>
            <Grid item xs={2}>
            </Grid>
        </Grid>
        <div className="data-rows">
        {data.map((item, index) => (
            <Grid className={`row ${index%2===0 ? 'even' : 'odd'}`} container spacing={1}>
                <Grid item xs={4} key={index}>
                    <div className="data">{item.width}</div>
                </Grid>
                <Grid item xs={4} key={index}>
                    <div className="data">{item.amount}</div>
                </Grid>
                <Grid item xs={2} key={index}>
                    <div className="data">{item.shelf}</div>
                </Grid>
                <Grid item xs={2}>
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

export default Detail;