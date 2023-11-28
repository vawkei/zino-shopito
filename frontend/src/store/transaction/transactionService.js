import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/transaction/`;


//getUserTransactions:
const getUserTransactions =async ()=>{
    const response = await axios.get(API_URL + "getUserTransactions" );
    return response.data
}

//verifyAccount:
const verifyAccount =async (formData)=>{
    const response = await axios.post(API_URL + "verifyAccount", formData );
    return response.data
}

//transferFunds:
const transferFunds =async (formData)=>{
    const response = await axios.post(API_URL + "transferFunds" , formData)
    return response.data
};

const transactionService = {getUserTransactions,transferFunds,verifyAccount};

export default transactionService;