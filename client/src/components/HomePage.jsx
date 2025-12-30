import logo from '../assets/logo.png'
import { useEffect } from 'react';
import { logout } from '../redux/UserSlice';
import { useDispatch } from 'react-redux';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);
    return (
        <>
            <img src={logo} alt="logo" width={1000} style={{ opacity: '0.5' }} />
        </>)
}
export default HomePage