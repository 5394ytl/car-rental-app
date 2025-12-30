import axios from "axios";

const API_URL = "https://localhost:7251/api/Rental";

export const getRentals = async (user) => {   
    console.log("user",user);          
    const res = await axios.get(API_URL+'/getByUser/'+user.id);
    console.log("res",res);    
    return res;
};

export const newRental = async (newRental) => { 
    const res = await axios.post(API_URL+'/add',newRental);
    return res;
};

export const deleteRental = async (id) => {         
    const res = await axios.delete(API_URL+'/Delete/'+id);
    return res;
};


