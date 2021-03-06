import { Grid } from '@material-ui/core';
import { cloneElement } from 'react';
import './Listing.css'

function Listing({ columns, data, icons }) {
    return (
        <div className='listing'>
            <Grid container spacing={1}>
                {columns.map((column, index) => (
                    <Grid key={index} item xs={column.size}>
                        <div className='header'>{column.label}</div>
                    </Grid>)
                )}
            </Grid>
            <div className='data-rows'>
            {data.map((row, index) => (
                <Grid key={index} className={`row ${index%2===0 ? 'even' : 'odd'}`} container spacing={1}>
                    {columns.slice(0, -1).map((column, indexChild) => (
                        <Grid key={indexChild} item xs={column.size}>
                            <div className='data'>
                                {column.cast !== undefined ? column.cast(row[column.field]) : row[column.field]}
                            </div>
                        </Grid>)
                    )}
                    <Grid item xs={columns[columns.length-1].size}>
                        {cloneElement(icons, {data: data[index]})}
                    </Grid>
                </Grid>
            ))}
            </div>
        </div>
    )
}

function ListingOptions({ children }) {
    return (
        <div className='listing-options'>
            {children}
        </div>
    )
}

export default Listing
export { ListingOptions }
