import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";
import { toast } from "react-toastify";

const initialTransactionState = {
  transaction: null,
  transactions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  receiversName:""
};



//getUserTransactions:
export const getUserTransactions = createAsyncThunk(
    "transaction/getUserTransactions",
    async (_, thunkApi) => {
      try {
        return await transactionService.getUserTransactions()
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.msg ||
          error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
  );

//verifyAccount:
export const verifyAccount = createAsyncThunk(
    "transaction/verifyAccount",
    async (formData, thunkApi) => {
      try {
        return await transactionService.verifyAccount(formData)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.msg) ||
          error.msg ||
          error.toString();
        return thunkApi.rejectWithValue(message);
      }
    }
  );
  

//transferFunds:
export const transferFunds = createAsyncThunk(
  "transaction/transferFunds",
  async (formData, thunkApi) => {
    try {
      return await transactionService.transferFunds(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialTransactionState,
  reducers: {
    RESET_TRANSACTION_MESSAGE(state){
      state.message="";
    },
    RESET_RECEIVERS_NAME(state){
      state.receiversName=""
    }
  },
  extraReducers(builder) {
    builder
      // getUserTransactions
      .addCase(getUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.transactions = action.payload;
        console.log(action.payload);
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        toast.error(action.payload);
      })
      // verifyAccount
      .addCase(verifyAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.receiversName=action.payload.receiversName;
        state.message = "Account verification successful";
        console.log(action.payload.msg);
        toast.success(action.payload.msg)
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        toast.error(action.payload);
      })
      // transferFunds
      .addCase(transferFunds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transferFunds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
        console.log(action.payload);
        toast.success(action.payload)
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
        toast.error(action.payload);
      })
  },
});

export default transactionSlice;
export const transactionSliceActions = transactionSlice.actions;
