import React from 'react';
import { useForm , Controller } from "react-hook-form";
import { TextField , FormGroup, FormControlLabel , Checkbox ,FormControl ,RadioGroup ,Radio , InputLabel , Select ,MenuItem} from '@material-ui/core';



export default function AddProduct(props) {
    const { register, handleSubmit , control ,errors } = useForm();
    const onSubmit = data => {
        console.log("control :: ",control);
        data.id = (JSON.parse(localStorage.getItem('productList')).length > 0 ) ?  JSON.parse(localStorage.getItem('productList')).length + 1 : 1;
        
        let locationArr = [];
        if(data.indialocation) locationArr = [...locationArr,"India"];
        if(data.uklocation) locationArr = [...locationArr,"UK"];
        if(data.usalocation) locationArr = [...locationArr,"USA"];
        data.location = locationArr;
        
        
        
        let newProductList = [...JSON.parse(localStorage.getItem('productList')), data];
        localStorage.setItem('productList', JSON.stringify(newProductList));
        
        props.history.push('/');
        //props.addItem(data);
    } 

    const [stock, setValue] = React.useState("instock");
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    return (
        <div>
            <h1>Add your Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <TextField 
                        id="title" 
                        label="Title" 
                        variant="outlined"
                        inputRef = {register({
                            required: true,
                            maxLength : 50,
                        })}
                        error={!!errors.title}
                        name="title"
                        rules={{ required: true }}
                        autoComplete="off"
                    />
                    <p>{errors.title && "Maximum character should be 50"}</p>
                </FormGroup>
                <FormGroup>
                    <TextField
                        id="desc"
                        label="desciption"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                        inputRef = {register({
                            required: true,
                            minLength : 10
                        })}
                        error={!!errors.desc}
                        rules={{ required: true }}
                        name="desc"
                        autoComplete="off"
                    />
                    <p>{errors.desc && "Minimum character should be 150"}</p>
                </FormGroup>
                <FormGroup>
                    <FormControl component="fieldset">
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            defaultValue="instock"
                            name="stock"
                            as={
                                <RadioGroup
                                aria-label="stock"
                                value={stock}
                                onChange={handleChange}
                                >
                                <FormControlLabel
                                    value="instock"
                                    control={<Radio />}
                                    label="In Stock"
                                />
                                <FormControlLabel
                                    value="outstock"
                                    control={<Radio />}
                                    label="Out Of Stock"
                                />
                                
                                </RadioGroup>
                            }
                        />
                    </FormControl>
                </FormGroup>

                <FormGroup>
                    <FormControlLabel
                        control={
                            <Controller
                            name="indialocation"
                            control={control}
                            defaultValue={false}
                            render={(props) => (
                                <Checkbox
                                {...props}
                                onChange={(e) => props.onChange(e.target.checked)}
                            />
                            )}
                        />
                        }
                        label="India"
                    />
                    <FormControlLabel
                        control={
                            <Controller
                            name="usalocation"
                            control={control}
                            defaultValue={false}
                            render={(props) => (
                                <Checkbox
                                {...props}
                                onChange={(e) => props.onChange(e.target.checked)}
                            />
                            )}
                        />
                        }
                        label="USA"
                    />
                    <FormControlLabel
                        control={
                            <Controller
                            name="uklocation"
                            control={control}
                            defaultValue={false}
                            render={(props) => (
                                <Checkbox
                                {...props}
                                onChange={(e) => props.onChange(e.target.checked)}
                            />
                            )}
                        />
                        }
                        label="UK"
                    />
                </FormGroup>

                <FormGroup style={{marginBottom : "20px"}}>
                    <TextField
                        id="price"
                        label="Price"
                        variant="outlined"
                        name="price"
                        autoComplete="off"
                        inputRef = {register({
                            required: true
                        })}
                        error={!!errors.price}
                        rules={{ required: true }}
                        
                    />
                </FormGroup>
                <FormGroup style={{marginBottom : "20px"}}>
                    <TextField
                        id="discountPrice"
                        label="Discount Price"
                        variant="outlined"
                        name="discountPrice"
                        autoComplete="off"
                        inputRef = {register({
                            required: true
                        })}
                        error={!!errors.discountPrice}
                        rules={{ required: true }}
                    />
                </FormGroup>
                <FormGroup style={{marginBottom : "20px"}}>
                    <TextField
                        id="imgPath"
                        label="Image Url"
                        variant="outlined"
                        name="imgPath"
                        inputRef={register({
                            required: true,
                            pattern: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                        })}
                        error={!!errors.imgPath}
                        rules={{ required: true }}
                        autoComplete="off"
                    />
                    <p>{errors.imgPath && "Please Enter Correct Image Path"}</p>
                </FormGroup>

                <FormGroup style={{marginBottom : "20px"}}>
                    <FormControl
                        error={Boolean(errors.rating)}
                    > 
                        <InputLabel id="demo-simple-select-label">
                            Rating
                        </InputLabel>
                        <Controller
                            as={
                                <Select>
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                </Select>
                            }
                            name="rating"
                            rules={{ required: "this is required" }}
                            control={control}
                            defaultValue="1"
                        />
                    </FormControl>       
                </FormGroup>
                
                <FormGroup style={{marginBottom : "20px"}}>
                    <TextField type="submit" variant="outlined" color="primary" ></TextField>
                </FormGroup>
            </form>
        </div>
    );
}
