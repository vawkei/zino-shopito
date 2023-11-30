//This index deals with the category and brand

import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import categoryAndBrandService from "./CatAndBrandService";
import productSlice from "./products/productIndex";
import couponSlice from "./coupon/couponIndex";
import filterSlice from "./products/filterSlice";
import cartSlice from "./cart/cartIndex";
import checkoutSlice from "./checkout/CheckoutIndex";
import orderSlice from "./order/orderIndex";
import transactionSlice from "./transaction/transactionIndex";
import authSlice from "./auth/authIndex";

//========================================================================
//                                  CATEGORY SLICE
//=========================================================================

const initialCategoryState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//createcategory:
export const createcategory = createAsyncThunk(
  "category/createcategory",
  async (formData, thunkAPI) => {
    try {
      return await categoryAndBrandService.createcategory(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//getCategories:
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryAndBrandService.getCategories();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//deleteCategory:
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (slug, thunkAPI) => {
    try {
      return await categoryAndBrandService.deleteCategory(slug);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: initialCategoryState,
  reducers: {
    RESET_CAT(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },

  extraReducers(builder) {
    builder
      //createcategory:
      .addCase(createcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
        console.log(action.payload);
        toast.success(action.payload.msg);
      })
      .addCase(createcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload.msg);
      })
      //getCategories:
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.categories;
        state.isSuccess = true;
        state.isError = false;
        //console.log(action.payload)
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
        console.log(action.payload);
      })
      //deleteCategory:
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload.msg);
        console.log(action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload.msg);
        console.log(action.payload);
      });
  },
});

//========================================================================
//                                  BRAND SLICE
//=========================================================================

const initialBrandState = {
  brands: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
//createBrand
export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (formData, thunkAPI) => {
    try {
      return await categoryAndBrandService.createBrand(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//getBrands:
export const getBrands = createAsyncThunk(
  "brand/getBrands",
  async (_, thunkAPI) => {
    try {
      return await categoryAndBrandService.getBrands();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//deleteBrand:
export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (slug, thunkAPI) => {
    try {
      return await categoryAndBrandService.deleteBrand(slug);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: initialBrandState,
  reducers: {
    RESET_BRAND(state) {
      state.isError = false;
      state.isLoading = false;
      // state.brand =[];
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers(builder) {
    builder
      //createBrand:
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.brands = action.payload;
        console.log(action.payload);
        toast.success(action.payload.msg);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload);
        toast.error(action.payload.msg);
      })
      //getBrands:
      .addCase(getBrands.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.brands = action.payload.brands;
        console.log(action.payload.brands);
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload.msg);
        toast.error(action.payload.msg);
      })
      //deleteBrand:
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload.msg);
        console.log(action.payload);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload.msg);
        console.log(action.payload);
      });
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    brand: brandSlice.reducer,
    product: productSlice.reducer,
    coupon: couponSlice.reducer,
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
    checkout: checkoutSlice.reducer,
    order:orderSlice.reducer,
    transaction:transactionSlice.reducer
  },
});


export const categoryActions = categorySlice.actions;
export const brandActions = brandSlice.actions;

export default store;
