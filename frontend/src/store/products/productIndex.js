import { createSlice,createAsyncThunk,configureStore } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

const initialProductState = {
    product:null,
    products:[],
    minPrice:null,
    maxPrice:null,
    totalStoreValue:0,
    outOfStock:0,
    category:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createProduct = createAsyncThunk(
    "products/createProduct", async(formData,thunkApi)=>{
        try{
            return await productService.createProduct(formData)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString()
            return thunkApi.rejectWithValue(message)
        }
    }
);


const productSlice = createSlice({
    name:"product",
    initialState:initialProductState,
    reducers:{},
    extraReducers(builder){
        builder
        //createProduct:
        .addCase(createProduct.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.isError=false;
            state.isSuccess=true;
            state.isLoading=false;
            state.products=action.payload;// push what we get from db here
            toast.success(action.payload.msg);
            console.log(action.payload);
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload;
            toast.error(action.payload)
        })
    }
})


  
  export const productActions = productSlice.actions;
  
  export default productSlice;