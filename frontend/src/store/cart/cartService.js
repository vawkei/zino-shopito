import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/auth/`;

const saveCartDB = async (cartData) => {
  const response = await axios.patch(API_URL + "saveCart", cartData);
 return response.data;
};
const getCartDB = async()=>{
  const response =await axios.get(API_URL + "getCart");
  return response.data
}

const cartService = { saveCartDB,getCartDB };
export default cartService;
