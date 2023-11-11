import axios from "axios";;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/coupon/`;

//createCoupon:
const createCoupon = async(formData)=>{
    const response = await axios.post(API_URL + "createCoupon", formData);
    return response.data
};

//getCoupons:
const getCoupons =async ()=>{
    const response = await axios.get(API_URL + "getCoupons");
    return response.data
};

//getSingleCoupon:
const getSingleCoupon = async(couponName)=>{
    const response =await axios.get(API_URL + couponName)
    return response.data
}

//deleteCoupon:
const deleteCoupon = async(id)=>{
    const response = await axios.delete(API_URL + id);
    return response.data
}

const couponService = {createCoupon,getCoupons,getSingleCoupon, deleteCoupon};
export default couponService;