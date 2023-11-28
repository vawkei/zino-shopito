import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import {toast} from "react-toastify";


const initialOrderState = {
  order:null,
  orders: [],
  totalOrderAmount:0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//createOrder:
export const createOrder = createAsyncThunk(
    "order/createOrder",async(formData,thunkApi)=>{
        try{
            return await orderService.createOrder(formData)
        }catch(error){
            const message=(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkApi.rejectWithValue(message)
        }
    }
)
//getOrders:
export const getOrders = createAsyncThunk(
    "order/getOrders",async(_,thunkApi)=>{
        try{
            return await orderService.getOrders()
        }catch(error){
            const message=(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkApi.rejectWithValue(message)
        }
    }
);

//getSingleOrder:
export const getSingleOrder = createAsyncThunk(
    "order/getSingleOrder",async(id,thunkApi)=>{
        try{
            return await orderService.getSingleOrder(id)
        }catch(error){
            const message=(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkApi.rejectWithValue(message)
        }
    }
);

//updateOrderStatus:
export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",async({id,formData},thunkApi)=>{
        try{
            return await orderService.updateOrderStatus(id,formData)
        }catch(error){
            const message=(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkApi.rejectWithValue(message)
        }
    }
);

const orderSlice = createSlice({
    name:"order",
    initialState:initialOrderState,
    reducers:{},
    extraReducers(builder){
    
        builder
        //createOrder:
        .addCase(createOrder.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            console.log(action.payload.msg);
            toast.success(action.payload)
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            console.log(action.payload);
            toast.error(action.payload)
        })
        //getOrders:
        .addCase(getOrders.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.orders=action.payload.orders;
            console.log(action.payload.orders)
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            console.log(action.payload)
            toast.error(action.payload)
        })
        //getSingleOrder:
        .addCase(getSingleOrder.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getSingleOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.order=action.payload;
            console.log(action.payload)
        })
        .addCase(getSingleOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            console.log(action.payload)
            toast.error(action.payload)
        })
        //updateOrderStatus:
        .addCase(updateOrderStatus.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            console.log(action.payload);
            toast.success(action.payload.msg)
        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            console.log(action.payload);
            toast.error(action.payload)
        })
    }
});


export default orderSlice;
export const orderSliceActions = orderSlice.actions
