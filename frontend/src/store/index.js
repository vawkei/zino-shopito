import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";
import categoryAndBrandService from "./CatAndBrandService";
import productSlice from "./products/productIndex";
import couponSlice from "./coupon/couponIndex";
import filterSlice from "./products/filterSlice";
import cartSlice from "./cart/cartIndex";
import checkoutSlice from "./checkout/CheckoutIndex";
import orderSlice from "./order/orderIndex";
import transactionSlice from "./transaction/transactionIndex";

//======================================
//                                  AUTH SLICE
//======================================
const initialAuthState = {
  isLoggedIn: false,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Register user:
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return authService.register(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user:
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout user:
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.msg ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//getLoginStatus:
export const getloginstatus = createAsyncThunk(
  "auth/getloginstatus",
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginStatus();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get user:
export const getuser = createAsyncThunk("auth/getuser", async (_, thunkAPI) => {
  try {
    return await authService.getUser();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.msg) ||
      error.msg ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
//getUser:
export const updateuser = createAsyncThunk(
  "auth/updateuser",
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//getPhoto:
export const updatephoto = createAsyncThunk(
  "auth/updatephoto",
  async (userData, thunkAPI) => {
    try {
      return await authService.updatePhoto(userData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //Register user:
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Registration successful");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.success(action.payload);
      })

      //Login user:
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log(action.payload); //i get in the console when i login
        //{_id:652bcf56f62063765c478344', name: 'ben2', email: 'ben2@gmail.com', role: 'customer', photo: 'https://i.ibb.co/4pDNDk1/avatar.png', …}email: "ben2@gmail.com"name: "ben2"phone: "+234"photo: "https://i.ibb.co/4pDNDk1/avatar.png"role: "customer"__v: 0_id: "652bcf56f62063765c478344"[[Prototype]]: Object
        toast.success("Login successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.success(action.payload);
      })

      //Logout user:
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = false;
        state.user = null;
        console.log(action.payload);
        toast.success(action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.success(action.payload);
      })

      //getLoginStatus:
      .addCase(getloginstatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getloginstatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = action.payload;
        //console.log(action.payload);
        if (action.payload.message === "invalid signature") {
          state.isLoggedIn = false;
        }
      })
      .addCase(getloginstatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //getUser:
      .addCase(getuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        //console.log(action.payload);
      })
      .addCase(getuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //updateUser:
      .addCase(updateuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log(action.payload);
        toast.success("User updated");
      })
      .addCase(updateuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      //updatePhoto:
      .addCase(updatephoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatephoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        console.log(action.payload);
        toast.success("User photo updated");
      })
      .addCase(updatephoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

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

export const authActions = authSlice.actions;
export const categoryActions = categorySlice.actions;
export const brandActions = brandSlice.actions;

export default store;
