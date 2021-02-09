import React from 'react';
import CheckBoxs from './CheckBoxs';
import RadioBox from './RadioBox';
import Grid from '@material-ui/core/Grid';
const { useImperativeHandle } = React;


const continents = [{
  "id" : "1",
  "name" : "India"
},{
 "id" : "2",
 "name" : "USA"
},{
 "id" : "3",
 "name" : "UK"
},]

const Filters = React.forwardRef((props,ref) => {
  useImperativeHandle(ref, () => ({
    getFilterdProductData(val) {
      getFilterdProductData(val);
    }
  }));
  function getFilterdProductData(inputVal){
    const productData = JSON.parse(localStorage.getItem('productList'));
    
    let newProductData = productData.filter((elem)=>{
      if(checkbox.length === 0){
        if(elem.title.toLowerCase().includes(inputVal) && elem.stock === radio){
          return elem;
        }
      }else{
        if(elem.title.toLowerCase().includes(inputVal) && elem.stock === radio && elem.location.some((val) => checkbox.indexOf(val) !== -1)){
          return elem;
        }
      }
      return null;
    })
    props.setProductData(newProductData);
  }

  const [radio, setRadio] = React.useState('instock');
  const [checkbox, setCheckbox] = React.useState(['India','USA','UK']);
  const [input, setInput] = React.useState('');
  
  React.useEffect(() =>{
    setInput(props.inputVal);
    getFilterdProductData(props.inputVal);
  },[checkbox,radio,props.inputVal]) 
  
  
  const setRadioVal = (val) => setRadio(val);
  const setCheckboxVal = (arr) => setCheckbox(arr);
  
  return (
    <Grid>
      <CheckBoxs
          list={continents}
          handleFilters={setCheckboxVal}
      />
      <RadioBox
        handleFilters={setRadioVal}
      ></RadioBox>
    </Grid>
  );
})

export default Filters

