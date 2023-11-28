import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/order/`;

//createOrders:
const createOrder = async (formData)=>{
    const response = await axios.post(API_URL + "createOrder" ,formData);
    return response.data
};

//getOrders:
const getOrders = async()=>{
    const response = await axios.get(API_URL + "getOrders");
    return response.data
};

//getSingleOrder:
const getSingleOrder = async(id)=>{
    const response = await axios.get(API_URL+ id)
    return response.data
};

//updateOrderStatus:
const updateOrderStatus = async(id,formData)=>{
    const response = await axios.patch(API_URL + id , formData);
    return response.data
}

const orderService = {createOrder,getOrders,getSingleOrder,updateOrderStatus};
export default orderService;