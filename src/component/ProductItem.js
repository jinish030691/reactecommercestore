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
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
//import { useParams } from "react-router";
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
  
  const onCardClick = (e) => {
    let pId = e.currentTarget.getAttribute("id");
    history.push({
      pathname: '/detail',
      search: `?id=${pId}`
    })
  }

  const deleteItem = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let pId = parseInt(e.currentTarget.getAttribute("id"));
    props.deleteItem(pId);
  }

  const addFavoriteItem = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
      <Card className={classes.root} onClick={onCardClick} id={props.productData.id}>
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
          <IconButton aria-label="like"
            onClick={addFavoriteItem}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="delete"
            id={props.productData.id}
            onClick={deleteItem}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
  );
}