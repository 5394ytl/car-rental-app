import logo from '../assets/logo1.png'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpUser } from '../redux/UserSlice'
import { ErrorOutline } from '@mui/icons-material';

const schema = yup.object().shape({
    Tz: yup
        .number()
        .required("ID must be entered")
        .min(100000000).max(999999999),
    Password: yup.string().required("Passward must be entered").min(4, "Passward must contain minimum 4 digits").max(8, "Passward can contain maximum 8 digits"),
    Name: yup.string().required("Name must be entered"),
    Email: yup.string().email("E_mail include in @ in the email address "),
    Phone: yup.string()
});


const SignUp = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validate, setValidate] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await dispatch(SignUpUser(data)).unwrap();
            navigate('/package');
        } catch (error) {
            setValidate(true);
        }
    };

    return (<>
        <div className="MuiBox-root css-bfm88r" id='id1'>
            <img src={logo} alt="logo" />
            <h3>Welcome user, please sign in to continue</h3>
            <div className="MuiBox-root css-1dovkig">
                <div className="MuiStack-root css-jfdv4h-MuiStack-root"></div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                        {validate && <>
                            <ErrorOutline color='error' style={{}} />
                            <span style={{ display: 'inline-block', color: 'rgba(196, 0, 0, 0.778)', fontWeight: 'bold', marginRight: '5vw' }}>This id already exist, Check your id</span>
                        </>}
                        <Box
                            noValidate
                            sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr' }, gap: 0.1, color: "#284087" }} >
                            <Box sx={{ color: '#284087', display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2 }} >
                                <TextField
                                    label="name"
                                    margin="normal"
                                    color='success'
                                    {...register("Name")}
                                    error={!!errors.Name}
                                    helperText={errors.Name?.message}
                                />
                                <TextField
                                    label="ID"
                                    fullWidth
                                    margin="normal"
                                    color='success'
                                    value={location.state?.user.Tz}
                                    onClick={() => setValidate(false)}
                                    {...register("Tz")}
                                    error={!!errors.Tz}
                                    helperText={errors.Tz ? "ID must be entered" : ''}
                                />
                            </Box>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr 1fr' }, gap: 2, color: '#284087' }}>
                                <TextField
                                    label="E_mail"
                                    fullWidth
                                    type='email'
                                    margin="normal"
                                    color='success'
                                    placeholder='your@gmail.com'
                                    {...register("Email")}
                                    error={!!errors.Email}
                                    helperText={errors.Email?.message}
                                />
                                <TextField
                                    label="phone"
                                    type="phone"
                                    fullWidth
                                    margin="normal"
                                    color='success'
                                    {...register("Phone")}
                                    error={!!errors.Phone}
                                    helperText={errors.Phone?.message}
                                />
                            </Box >
                            Enter a password that you will remember easily
                            <TextField
                                label="Password"
                                fullWidth
                                margin="normal"
                                color='success'
                                value={location.state?.user.Password}
                                {...register("Password")}
                                error={!!errors.Password}
                                helperText={errors.Password?.message}
                            />
                        </Box>
                    </div>
                    <Button sx={{ color: '#284087' }} id='logIn' type='submit' >Sign Up</Button>
                    <p style={{ display: 'inline-block', marginRight: 4 }}>Have already an account? </p><NavLink to="/signIn">Log In</NavLink>
                </form>
            </div>
        </div>
    </>)
}

export default SignUp                