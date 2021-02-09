import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MainLayout from './pages/MainLayout';
import Detail from './pages/Detail';
import AddProduct from './pages/AddProduct';
import Breadcrumbs from './component/Breadcrumb';
import TrashProduct from './pages/TrashProduct';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Router>
      <Container maxWidth="lg" className="page-wrapper" style={{marginTop:'79px'}}>
        <Breadcrumbs />
        <Switch>
          <Route exact path="/" component={MainLayout} /> 
          <Route path="/detail" component={Detail}/>
          <Route path="/addItem" component={AddProduct}/>
          <Route path="/trashItem" component={TrashProduct}/>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

