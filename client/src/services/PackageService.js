import axios from "axios"
 
const BASE_URL = "https://localhost:7251/api/Package"
 
export const fetchPackages = () => axios.get(BASE_URL+'/get')

export const updatePackeges = async (pack) => {
    console.log("pack",pack);
    console.log("packid",pack.id);
     const res = await axios.put(BASE_URL+'/update/'+pack.id , pack);
    return res;
};
