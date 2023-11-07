import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/products/`;


 const createProduct =async (formData)=>{
    const response = await axios.post(API_URL , formData);
    return response.data
}

const productService = {
    createProduct
};
export default productService;