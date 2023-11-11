import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/products/`;


 const createProduct =async (formData)=>{
    const response = await axios.post(API_URL , formData);
    return response.data
};

//getProducts:
const getProducts = async()=>{
    const response = await axios.get(API_URL);
    return response.data
};

//deleteProducts:
const deleteProduct = async(id)=>{
    const response = await axios.delete(API_URL + id);
    return response.data
}

//getSingleProduct:

const getSingleProduct =async (id)=>{
    const response = await axios.get(API_URL + id);
    return response.data
};

const updateProduct = async(id,formData)=>{
    const response =await axios.patch(API_URL + id, formData );
    return response.data
}

const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct
};
export default productService;