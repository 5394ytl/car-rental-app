import axios from "axios"

const BASE_URL = "https://localhost:7251/api/Purchase"

export const getPurchases = (id) => axios.get(BASE_URL + '/getByUser/' + id)

export const buyPackage = async (pack) => {
    console.log("pack", pack);
    const res = await axios.post(BASE_URL + '/add', pack)
    return res;
}