import {
    createSlice,
    createAsyncThunk,
    //configureStore,
  } from "@reduxjs/toolkit";
  
  import authService from "./authService";
  
import { toast } from "react-toastify";


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
  
//updateUser:
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

  export default authSlice;
  export const authActions = authSlice.actions;