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

export const getProducts = createAsyncThunk(
    "products/getProducts",async(_,thunkApi)=>{
        try{
            return await productService.getProducts()
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg ||  error.toString();
            return thunkApi.rejectWithValue(message)
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",async(id,thunkApi)=>{
        try{
            return await productService.deleteProduct(id)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkApi.rejectWithValue(message)
        }
    }
);

//getSingleProduct:
export const getSingleProduct = createAsyncThunk(
    "products/getSingleProduct",async(id,thunkApi)=>{
        try{
            return await productService.getSingleProduct(id)
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkApi.rejectWithValue(message)
        }
    }
);


//updateProduct:
export const updateProduct = createAsyncThunk(
    "products/updateProduct",async({id,formData},thunkApi)=>{
        try{
            return await productService.updateProduct(id,formData)
        }catch(error){
            const message =(error.response && error.response.data && error.response.data.msg) || error.msg || error.toString();
            return thunkApi.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name:"product",
    initialState:initialProductState,
    reducers:{
        RESET_PRODUCT(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
          },
    },
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
            state.message="Product created successfully";  
            // state.product=action.payload;// push what we get from db here
            toast.success(action.payload.msg);
            console.log(action.payload);
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            toast.error(action.payload)
            console.log(action.payload)
        })
        //getProducts:
        .addCase(getProducts.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.products=action.payload.products;
            console.log(action.payload.products)
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
            toast.error(action.payload);
            console.log(action.payload)
        })
        //deleteProduct:
        .addCase(deleteProduct.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.message=action.payload.msg;
            console.log(action.payload)
            toast.success(action.payload.msg)
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            console.log(action.payload)
            toast.error(action.payload.msg)
        })

        //getSingleProduct:
        .addCase(getSingleProduct.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product=action.payload; // to store the product we requested
            console.log(action.payload);
        })
        .addCase(getSingleProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            console.log(action.payload)
            toast.error(action.payload)
        })

        //updateProduct:
        .addCase(updateProduct.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.message= "Product updated successfully";
            console.log(action.payload)
            toast.success(action.payload.msg)
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            console.log(action.payload);
            toast.error(action.payload)
        })
    }
})


  
  export const productActions = productSlice.actions;
  
  export default productSlice;