import axios from "axios";

const API_URL = "https://localhost:7251/api/PurchaseRental";

export const addPurchaseRental = async (newPurchaseRental) => {
    const res = await axios.post(API_URL + '/add', newPurchaseRental);
    return res;
};