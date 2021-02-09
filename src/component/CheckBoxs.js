/*import React , {useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const checkboxlist = [{
   "id" : "1",
   "name" : "India"
},{
  "id" : "2",
  "name" : "USA"
},{
  "id" : "3",
  "name" : "UK"
},]

export default function CheckboxLabels(props) {
  
  const renderCheckboxList = () => checkboxlist.map((value,index) => (
    <React.Fragment key={index}>
      <FormControlLabel
        control={<Checkbox 
          defaultValue={false} 
          onChange={handleChange(value.id)} 
          name={value.name} 
        />}
        label={value.name}
      />
    </React.Fragment>
  ))

  const [state, setState] = React.useState([]);
  
  const handleChange = (value) => {
    console.log("value :: ",value);
    const currentIndex = state.indexOf(value);
    const newState = [...state];


    if(currentIndex === -1){
      newState.push(value);
    }else{
      newState.splice(currentIndex, 1);
    }
    console.log("newState :: ",newState);
    setState(newState);
    //props.handleFilters(newState);
    //setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    console.log(state)
  })
  
  return (
    <FormGroup row>
      {renderCheckboxList()}
    </FormGroup>
  );
}*/

import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';

function CheckBoxs(props) {

    const [Checked, setChecked] = useState(['India','USA','UK'])

    const handleToggle = (value) => {
        
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked);
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }
    
    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <div>
              <Checkbox className="filter-checkbox"
                  onChange={() => handleToggle(value.name)}
                  type="checkbox"
                  checked={Checked.indexOf(value.name) === -1 ? false : true}
              />&nbsp;&nbsp;
              <span>{value.name}</span>
            </div>
        </React.Fragment>
    ))

    return (
        <div>
            {renderCheckboxLists()}
        </div>
    )
}

export default CheckBoxs