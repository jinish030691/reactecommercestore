import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


export default function RadioButtonsGroup(props) {
  const [value, setValue] = React.useState('instock');

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleFilters(event.target.value);
  };

  return (
    <FormControl component="fieldset">
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel value="instock" control={<Radio />} label="in stock" />
            <FormControlLabel value="outstock" control={<Radio />} label="out of stock" />
        </RadioGroup>
    </FormControl>
  );
}