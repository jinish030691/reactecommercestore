import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function InputWithIcon(props) {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        let inputValue = (event.target.value).trim();
        setValue(inputValue);
        props.handleFilters(inputValue);
    };

    const classes = useStyles();

    const searchBar = {
        alignItems: 'right'
    };

    return (
        <div style={searchBar}>
            <FormControl className={classes.margin}>
                <Input
                    id="searchInput"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Search..."
                />
            </FormControl>
        </div>
    );
}