import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductItems from '../component/ProductItems';

export default function TrashItem(props) {
    let deletedData = JSON.parse(localStorage.getItem('removeList'));
    return (
        <Grid container spacing={3}>
            {/* <h1>Deleted Product</h1> */}
            {(deletedData !== null && deletedData.length > 0) ? <ProductItems productData={deletedData} type="delete"></ProductItems> : <h2>No Data Found.</h2>}
        </Grid>
    );
}