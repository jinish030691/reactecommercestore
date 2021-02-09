import React from 'react';
import { useLocation } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';
import FormLabel from '@material-ui/core/FormLabel';
import { Button , ButtonGroup, Typography, Box,Grid  } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from "react-router-dom";

export default function Detail(props) {
    const history = useHistory();
    const location = useLocation();
    let selectedPId = parseInt(location.search.split("=")[1]);

    const productData = JSON.parse(localStorage.getItem('productList'));
    
    const filteredProduct = productData.filter(product => product.id === selectedPId)[0];
    
    function onBackBtnClick(){
        history.push('/');
    }

    function onAddProductBtnClick(){
        history.push('/addItem');
    }
    
    return (
        <>
            <Button
                className="page-back"
                variant="contained"
                color="primary"
                startIcon={<KeyboardBackspaceIcon />}
                onClick={onBackBtnClick}>
                
            </Button>
            
            <Grid container spacing={3}>
                <Grid item md={6}>
                    {/* <img src={`/static/images/cards/${filteredProduct.imgPath}`} alt="" width="500" height="600"></img> */}
                    <img src={filteredProduct.imgPath} alt="" width="100%" height="600"></img>
                </Grid>
                <Grid item md={6}>
                    <Typography component="h2">
                        <Box fontWeight="fontWeightRegular" fontSize="h4.fontSize">{filteredProduct.title}</Box>
                    </Typography>
                    <Box display="flex"  alignItems="center" component="div" className="ratings">
                        {Array.apply(0, Array(parseInt(filteredProduct.rating))).map(function (x, i) {
                            return <StarIcon key={i}/>;
                        })}
                        <FormLabel component="legend">- 5 Reviews</FormLabel>

                    </Box>
                    <Box display="flex"  alignItems="center" component="div" className="pro-pricing">
                        <Typography component="h3" >
                            <Box component="span" fontWeight="fontWeightBold" fontSize="h4.fontSize">{filteredProduct.discountPrice}</Box>
                            
                        </Typography>
                        <Typography component="del" >
                            <Box component="span" fontWeight="fontWeightLight" fontSize="h5.fontSize">{filteredProduct.price}</Box>
                            
                        </Typography>
                        
                    </Box>
                    <p>{filteredProduct.desc}</p>
                    <Box display="flex"  alignItems="center" component="div" className="pro-size">
                        <Typography component="label">Size:</Typography>
                        {(filteredProduct.sizes) ? <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            {
                                filteredProduct.sizes.map((obj,index)=>{
                                    return <Button key={index}>{obj}</Button>
                                })
                            }
                        </ButtonGroup> : null}
                    </Box>
                    <Button className="addtocart-btn" variant="contained" color="primary">
                        Add To Cart
                    </Button>
                    <Box display="block"  component="div" className="checkout-box text-center">
                        <Typography component="h4">
                            <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                                Guaranteed Safe Checkout
                            </Box>
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={onAddProductBtnClick}>
                            Add New Product
                        </Button>
                    </Box>
                </Grid>
            </Grid>       
        </>
    );
}