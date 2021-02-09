import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import Loader from './Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  let history = useHistory();

  const classes = useStyles();
  
  const restoreClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let restoreId = parseInt(e.currentTarget.getAttribute('id'));
    let productList = JSON.parse(localStorage.getItem('removeList')).filter(x => x.id === restoreId)[0];
    let newProductList = [...JSON.parse(localStorage.getItem('productList')), productList];
    localStorage.setItem('productList', JSON.stringify(newProductList));
    
    let deletedList = JSON.parse(localStorage.getItem('removeList')).filter(x => x.id !== restoreId);
    localStorage.setItem('removeList', JSON.stringify(deletedList));

    history.push('/');
  } 

  const removeClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let restoreId = parseInt(e.currentTarget.getAttribute('id'));
    let deletedList = JSON.parse(localStorage.getItem('removeList')).filter(x => x.id !== restoreId);
    console.log("deletedList :: ",deletedList);
    localStorage.setItem('removeList', JSON.stringify(deletedList));
    history.push('/');
  }

  return (
      <Card className={classes.root} id={props.productData.id}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.productData.title}
          //subheader="September 14, 2016"
        />
        {props.productData.imgPath ? (
          <CardMedia
          className={classes.media}
          //image={`/static/images/cards/${props.productData.imgPath}`} 
          image={props.productData.imgPath}
          title="Paella dish"
        />
        ) : (
          <Loader />
        )}
        
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.productData.desc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button variant="contained" style={{marginRight: "10px"}} id={props.productData.id} onClick={restoreClick}>Restore</Button>
          <Button variant="contained" style={{marginRight: "10px"}} id={props.productData.id} onClick={removeClick}>Remove</Button>
        </CardActions>
      </Card>
  );
}