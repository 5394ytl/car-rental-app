import './App.css'
import SignIn from './components/SignIn'
import Package from './components/Packages'
import SignUp from './components/SignUp'
import { Routes, Route } from 'react-router-dom'
import Products from './components/Products'
import MyPurchases from './components/MyPurchases '
import HomePage from './components/HomePage'
import RentalHistories from './components/RentalHistories'
import ActiveRental from './components/ActiveRental'
import NewRental from './components/NewRental'
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar><HomePage /></NavBar>} />
        <Route path="/" element={<NavBar><Package /></NavBar>} />
        <Route path="/MyPurchases" element={<NavBar><ProtectedRoute><MyPurchases /></ProtectedRoute></NavBar>} />
        <Route path="/product" element={<NavBar><Products /></NavBar>} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/package" element={<NavBar><Package /></NavBar>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/NewRental" element={<NavBar><ProtectedRoute><NewRental /></ProtectedRoute></NavBar>} />
        <Route path="/ActiveRental" element={<NavBar><ProtectedRoute><ActiveRental /></ProtectedRoute></NavBar>} />
        <Route path="/RentalHistories" element={<NavBar><ProtectedRoute><RentalHistories /></ProtectedRoute></NavBar>} />
        <Route path="/ProtectedRoute" element={<NavBar><ProtectedRoute /></NavBar>} />
        <Route path="*" element={<p>not found</p>} ></Route>
      </Routes >
    </>
  )
}

export default App