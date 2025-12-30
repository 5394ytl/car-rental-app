import Button from '@mui/material/Button';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Product from './Product'
import { getProducts } from '../redux/ProductSlice';
import { useNavigate } from 'react-router-dom';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(state => state.productReducer.productList)

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]); 

  const [chooseProd, setChooseProd] = useState()
  const handleChange = (event) => {
    setChooseProd(event.target.value)
  };
  const toBuy = () => {
    if (chooseProd) {
      navigate('/NewRental', { state: { prod: chooseProd } });
    }
    else {
      alert("you dont choose any car to rental")
    }
  }

  return (
    <>
      <div id='box'
        style={{ display: 'flex', marginLeft: 0, gap: 25 }}>
        <Box noValidate
          sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr 1fr 1fr' }, gap: 5, paddingTop: 5, marginLeft: -2 }}>
          {products.map((prod, index) =>
            <>
              <Product prod={prod} index={index} />
            </>
          )}
        </Box>
        <div style={{ marginTop: '3vw', marginRight: 0, placeSelf: 'flex-start' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" >Choose Car</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chooseProd}
              label="Choose Car"
              onChange={handleChange}
            >
              {products.map((prod, index) =>
                <MenuItem value={prod}>{prod.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          <Button sx={{ color: '#284087' }}
            id='logIn'
            onClick={toBuy} >to buy product</Button>
        </div></div>
    </>
  );
}

export default Products