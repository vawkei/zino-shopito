import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/`;

//create category:
const createcategory = async (formData) => {
  const response = await axios.post(
    API_URL + "category/createcategory",
    formData
  );
  return response.data;
};

//get categories:
const getCategories = async () => {
  const response = await axios.get(API_URL + "category/getCategories");
  return response.data;
};

///delete category:
const deleteCategory = async (slug) => {
  const response = await axios.delete(API_URL + "category/" + slug);
  return response.data;
};


//create brand:
const createBrand = async(formData)=>{
  const response = await axios.post(API_URL + "brand/createBrand", formData);
  return response.data
};

//getBrands:
const getBrands = async()=>{
  const response = await axios.get(API_URL + "brand/getBrands");
  return response.data
};

const deleteBrand = async (slug) => {
  const response = await axios.delete(API_URL + "brand/" + slug);
  return response.data;
};

const categoryAndBrandService = {
  createcategory,
  getCategories,
  deleteCategory,
  createBrand,
  getBrands,
  deleteBrand
};
export default categoryAndBrandService;
