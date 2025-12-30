import axios from "axios"
 
const BASE_URL = "https://localhost:7251/api/Product"
 
export const fetchProducts = () => axios.get(BASE_URL+'/get')
