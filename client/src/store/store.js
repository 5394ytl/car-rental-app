import { configureStore } from '@reduxjs/toolkit'
import packageReducer from '../redux/PackageSlice.js'
import productReducer from '../redux/ProductSlice.js'
import MyPurchasesReducer from '../redux/MyPurchasesSlice.js' 
import userReducer from '../redux/UserSlice.js'
import rentalReducer from '../redux/RentalSlice.js'

export const store = configureStore({
  reducer:{
    packageReducer,
    productReducer,
    MyPurchasesReducer,
    userReducer,
    rentalReducer
  }
})