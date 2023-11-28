import { createSlice } from "@reduxjs/toolkit";

const initialCheckoutSlice = {
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "",

  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : "",

  billingAddress: localStorage.getItem("billingAddress")
    ? JSON.parse(localStorage.getItem("billingAddress"))
    : "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialCheckoutSlice,
  reducers: {
    SAVE_PAYMENT_METHOD(state, action) {
      state.paymentMethod = action.payload;
      console.log(action.payload)
      //save to local storage
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
    SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload;
      
      //save to local storage
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    SAVE_BILLING_ADDRESS(state,action){
        state.billingAddress = action.payload;

        //save to local storage
        localStorage.setItem("billingAddress",JSON.stringify(state.billingAddress))
    }
  },
});

export default checkoutSlice;
export const checkoutActions = checkoutSlice.actions;
