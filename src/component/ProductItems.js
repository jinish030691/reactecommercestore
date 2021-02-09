import React from 'react';
import ProductItem from './ProductItem';
import Grid from '@material-ui/core/Grid';
import DeletedProductItem from './DeletedProductItem';

export default function ProductItems(props) {
    return (
        <Grid container spacing={3}>
            {props.productData.map((value, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    {(props.type === 'delete') ? <DeletedProductItem key={index} productData={value}></DeletedProductItem> : 
                    <ProductItem key={index} productData={value} deleteItem={props.deleteItem}></ProductItem> }
                </Grid>
            ))}
        </Grid>
    );
}