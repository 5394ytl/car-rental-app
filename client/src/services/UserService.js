import axios from "axios";

const API_URL = "https://localhost:7251/api/User";

export const signIn = async (userData) => {
    const res = await axios.post(API_URL + '/login', userData);   
    return res;
}

export const signUp = async (userData) => {
    const res = await axios.post(API_URL + '/add', userData);
    return res;
};