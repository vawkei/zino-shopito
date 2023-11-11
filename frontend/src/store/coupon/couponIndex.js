import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import couponService from "./couponService";
import {toast} from "react-toastify";

const initialCouponState = {
  coupon: null,
  coupons:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//createCoupon:
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (formData, thunkApi) => {
    try {
      return await couponService.createCoupon(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
        return thunkApi.rejectWithValue(message)
    }
  }
);

//getCoupons:
export const getCoupons = createAsyncThunk(
  "coupon/getCoupons",async(_,thunkApi)=>{
    try{
      return await couponService.getCoupons();
    }catch(error){
      const message=(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
      return thunkApi.rejectWithValue(message)
    }
  }
);

//getSingleCoupon:
export const getSingleCoupon = createAsyncThunk(
  "coupon/getSingleCoupon",async(couponName,thunkApi)=>{
    try{
      return await couponService.getSingleCoupon(couponName)
    }catch(error){
      const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
      return thunkApi.rejectWithValue(message)
    }
  }
)

//deleteCoupon:
export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",async(id,thunkApi)=>{
    try{
      return await couponService.deleteCoupon(id)
    }catch(error){
      const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
      return thunkApi.rejectWithValue(message)
    }
  }
)


const couponSlice = createSlice({
  name: "coupon",
  initialState: initialCouponState,
  reducers: {},
  extraReducers(builder){
    builder
    //createCoupon:
    .addCase(createCoupon.pending,(state)=>{
        state.isLoading =true;
    })
    .addCase(createCoupon.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess=true; 
        state.isError=false;
        console.log(action.payload);
        toast.success(action.payload)
    })
    .addCase(createCoupon.rejected,(state,action)=>{
        state.isLoading=false;
        state.isError=true;
        console.log(action.payload)
        toast.error(action.payload)
    })
    //getCoupons"
    .addCase(getCoupons.pending,(state)=>{
      state.isLoading=true;
    })
    .addCase(getCoupons.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.isError=false;
      state.isSuccess=true;
      state.coupons=action.payload.coupons;
      //console.log(action.payload.coupons)
    })
    .addCase(getCoupons.rejected,(state,action)=>{
      state.isLoading=false;
      state.isError=true;
      state.isSuccess=false;
      console.log(action.payload)
      toast.error(action.payload)
    })
    //getSingleCoupon:
    .addCase(getSingleCoupon.pending,(state)=>{
      state.isLoading=true;
    })
    .addCase(getSingleCoupon.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.isSuccess=true;
      state.coupon=action.payload.coupon;
      //console.log(action.payload);
      //toast.success(action.payload)
    })
    .addCase(getSingleCoupon.rejected,(state,action)=>{
      state.isLoading=false;
      state.isError=true;
      toast.error(action.payload.msg);
      console.log(action.payload.msg)
    })
    //deleteCoupon:
    .addCase(deleteCoupon.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(deleteCoupon.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.isError=false;
      state.isSuccess=true;
      console.log(action.payload.msg);
      toast.success(action.payload.msg)
    })
    .addCase(deleteCoupon.rejected,(state,action)=>{
      state.isLoading=false;
      state.isError=true;
      toast.error(action.payload);
      console.log(action.payload)
      
    })
  }
});

export default couponSlice;
export const couponActions = couponSlice.actions;
