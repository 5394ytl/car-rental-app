import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = useSelector(state => state.userReducer.user);
    return (
        <>
            {user ? children : <><h1 style={{ color: '#284087' }}>You are not connected</h1>
                <Link to='/signUp' style={{ color: 'white', backgroundColor: '#284087', padding: '8px', borderRadius: '5px', marginRight: '5px' }} >sign Up</Link>
                <Link to='/signIn' style={{ color: 'white', backgroundColor: '#284087', padding: '8px', borderRadius: '5px' }} >sign in</Link>
            </>}
        </>
    )
}

export default ProtectedRoute
