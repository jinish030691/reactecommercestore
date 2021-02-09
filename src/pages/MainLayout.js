import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import Searchbar from '../component/Searchbar';
import ProductItems from '../component/ProductItems';
import Filters from '../component/Filters';
import Grid from '@material-ui/core/Grid';

const { useRef } = React;

const drawerWidth = 240;

const productList = [
  { id: 1, title: "Jack & Jones Men's T-Shirt" ,imgPath : 'https://stora-next.herokuapp.com/assets/images/products/clothes/1.png' ,desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi illo possimus quae tenetur. Porro aliquam quaerat dolorum pariatur molestias commodi ipsa' ,rating : 2 , price : '$59.99' , discountPrice : '$39.99' , sizes : ['S','M'] , location : ['India','US'] ,stock : 'instock' },
  { id: 2, title: "Fold Over Collar Plain Blazers" ,imgPath : 'https://stora-next.herokuapp.com/assets/images/products/clothes/2.png',desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi illo possimus quae tenetur. Porro aliquam quaerat dolorum pariatur molestias commodi ipsa',rating : 3 , price : '$69.99' , discountPrice : '$49.99', sizes : ['S','M' , 'L']  , location : ['India'] ,stock : 'outstock'},
  { id: 3, title: "Ivory Check Longline Tunic Shirt" ,imgPath : 'https://stora-next.herokuapp.com/assets/images/products/clothes/3.png',desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi illo possimus quae tenetur. Porro aliquam quaerat dolorum pariatur molestias commodi ipsa',rating : 5 , price : '$79.99' , discountPrice : '$59.99', sizes : ['S','XL']  , location : ['UK'] ,stock : 'outstock'},
  { id: 4, title: "Vero Moda Coco Wide Pant" ,imgPath : 'https://stora-next.herokuapp.com/assets/images/products/clothes/4.png',desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi illo possimus quae tenetur. Porro aliquam quaerat dolorum pariatur molestias commodi ipsa',rating : 5 , price : '$79.99' , discountPrice : '$59.99', sizes : ['S','XL']  , location : ['UK'] ,stock : 'instock'},
  { id: 5, title: "Vero Moda Coco Wide Pant Blue" ,imgPath : 'https://stora-next.herokuapp.com/assets/images/products/clothes/5.png',desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi illo possimus quae tenetur. Porro aliquam quaerat dolorum pariatur molestias commodi ipsa',rating : 5 , price : '$79.99' , discountPrice : '$59.99', sizes : ['S','XL']  , location : ['UK'] ,stock : 'instock'}
];

const removeList = [];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
}));

export default function MainLayout(props) {
  const childRef = useRef();
  if(JSON.parse(localStorage.getItem('productList')) === null){
    localStorage.setItem('productList', JSON.stringify(productList));
  }
  if(JSON.parse(localStorage.getItem('removeList')) === null){
    localStorage.setItem('removeList', JSON.stringify(removeList));
  }
  
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [productData , setProductData] = React.useState(JSON.parse(localStorage.getItem('productList')));
  const [inputVal , setInputVal] = React.useState('');
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateProductData = (newData) => {
    (newData.length > 0) ? setProductData(newData) : setProductData([]);//setProductData(JSON.parse(localStorage.getItem('productList')));
  }

  const handleFilters = (val) => {
    setInputVal(val);
  }

  const onIconClick = (e) => {
    let btnName = e.currentTarget.getAttribute('name');
    (btnName === 'Trash') ? props.history.push('/trashItem') : props.history.push('/');
  }

  const deleteItem = (id) => {
    let msg = window.confirm("Do you want to delete this item");
    if(msg){
      let productList = JSON.parse(localStorage.getItem('productList')).filter(x => x.id === id)[0];
      let newProductList = [...JSON.parse(localStorage.getItem('removeList')), productList];
      localStorage.setItem('removeList', JSON.stringify(newProductList));
      
      let deletedList = JSON.parse(localStorage.getItem('productList')).filter(x => x.id !== id);
      localStorage.setItem('productList', JSON.stringify(deletedList));
      setProductData(deletedList);
    }
    childRef.current.getFilterdProductData(inputVal);
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Searchbar handleFilters={handleFilters}></Searchbar>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Trash'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon name={text} onClick={onIconClick}>{index % 2 === 0 ? <HomeIcon /> : <RestoreFromTrashIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} md={2}>
            <Filters setProductData={updateProductData} inputVal={inputVal} ref={childRef}></Filters>
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            {(productData.length > 0) ? <ProductItems productData={productData} deleteItem={deleteItem}></ProductItems> : <h2>No Data Found.</h2>}
          </Grid>
        </Grid>
      </main>
    </div>
  );
}