//This stores the http request codes that we use to make request to the backend
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/auth/`;

//Register user:
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    withCredentials: true, //we can set this as a default in app.js
  });
  return response.data; //response.data:returns code from the backend
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.msg;
};

//Get login status

const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "getloginstatus");
  return response.data;
};

// Get user:
const getUser = async () => {
  const response = await axios.get(API_URL + "getuser");
  return response.data;
};

// Update user Profile:
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateuser", userData);
  return response.data;
};

// Update user Photo:
const updatePhoto = async (userData) => {
  const response = await axios.patch(API_URL + "updatephoto", userData);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  updatePhoto
};

export default authService;
