import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, IconButton, InputAdornment } from '@mui/material';
import { VisibilityOff, Visibility, ErrorOutline } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import logo from '../assets/logo1.png'
import { SignInUser } from '../redux/UserSlice'

const schema = yup.object().shape({
  Tz: yup
    .number("ID must be entered")
    .required("ID must be entered")
    .min(100000000, "ID must contain 9 digits").max(999999999, "ID must contain only 9 digits"),
  Password: yup.string().required("Passward must be entered").min(4, "Passward must contain minimum 4 digits"),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validate, setValidate] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(SignInUser(data)).unwrap()
      navigate('/ActiveRental');
    } catch (error) {
      switch (error) {
        case 400:
          setValidate(true)
          navigate("/signIn");
          break;
        case 404:
          navigate("/signUp", { state: { user: data } });
          break;
      }
    }
  };

  return (
    <>
      <div className="MuiBox-root css-bfm88r" id='id2'>
        <img src={logo} alt="logo" />
        <h3>Welcome user, please log in to continue</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {validate && <>
            <ErrorOutline color='error' style={{}} />
            <span style={{ display: 'inline-block', color: 'rgba(196, 0, 0, 0.778)', fontWeight: 'bold', fontSize: '0.8vw' }}>You mistake password, Enter the password again</span>
          </>}
          <Box
            noValidate
            sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr' }, color: "#284087" }}
          >
            <TextField
              label="Id"
              fullWidth
              margin="normal"
              color='success'
              {...register("Tz")}
              error={!!errors.Tz}
              helperText={errors.Tz ? "ID must be entered" : ''}
            />
            <FormControl sx={{ my: 2 }} fullWidth variant="outlined" color='success'>
              <TextField
                id="outlined-adornment-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                color='success'
                onClick={() => setValidate(false)}
                endadornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="inherit" />
                      ) : (
                        <Visibility fontSize="inherit" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("Password")}
                error={!!errors.Password}
                helperText={errors.Password?.message}
              />
            </FormControl>
          </Box>
          <Button sx={{ color: '#284087' }} id='logIn' type='submit' >Log In</Button>
          <p style={{ display: 'inline-block', marginRight: 4 }}>Don't have account? </p><NavLink to="/signUp">Sign Up</NavLink>
        </form>
      </div>
    </>
  )
}

export default SignIn
