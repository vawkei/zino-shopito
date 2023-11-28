import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCartQuantityById } from "../../utils";
import cartService from "./cartService";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

function applyDiscount(cartTotalAmount,discountPercentage){
  var discountAmount = (discountPercentage/100) * cartTotalAmount;
  var updatedTotal = cartTotalAmount - discountAmount;
  return updatedTotal
};

const initialCartState = {
  // cartItems:[],
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalAmount: 0,
  initialCartTotalAmount: 0, //this is the amount b4 coupon was applied.the original amount.just to show the user the original price, to know what they have benefitted from the coupon.
  cartTotalQuantity: 0,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

//Save cart to DB:
export const saveCartDB = createAsyncThunk(
  "cart/saveCartDB",
  async (cartData, thunkApi) => {
    try {
      return await cartService.saveCartDB(cartData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
//get cart DB:
export const getCartDB = createAsyncThunk(
  "cart/getCartDB",
  async (_, thunkApi) => {
    try {
      return await cartService.getCartDB();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.msg ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    ADD_TO_CART(state, action) {
      const cartquantity = getCartQuantityById(
        state.cartItems,
        action.payload._id
      );

      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (productIndex >= 0) {
        //Item already exists in the cart
        //Increase the cartQuantity
        // state.cartTotalQty ++;
        if (cartquantity === action.payload.quantity) {
          state.cartItems[productIndex].cartQuantity += 0;
          toast.info("Maximum number of products reached", {
            position: "top-left",
          });
          console.log(`${action.payload.name} increased by 1`);
        } else {
          state.cartItems[productIndex].cartQuantity += 1;
          toast.success(`${action.payload.name} increased by 1`, {
            position: "top-left",
          });
          console.log(`${action.payload.name} increased by 1`);
        }
      } else {
        //Item doesn't exist in the cart
        //Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
        console.log(`${action.payload.name} added to cart`);
      }
      //save to localStorage:
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      console.log(productIndex);

      if (state.cartItems[productIndex].cartQuantity > 1) {
        //Decrease cart:
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.success(`${action.payload.name} quantity decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        //If the quantity of the product is only one,
        // we remove the product entirely from the cart:
        const newCartItems = state.cartItems.filter((item) => {
          return item._id !== action.payload._id;
        });
        state.cartItems = newCartItems;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }
      //save to localStorage:
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItems = state.cartItems.filter((item) => {
        return item._id !== action.payload._id;
      });
      state.cartItems = newCartItems;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });
      //save to localStorage:
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.success("Cart cleared", { position: "top-left" });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_TOTAL_QUANTITY(state) {
      const array = [];
      state.cartItems?.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
      //localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
    },
    CALCULATE_SUB_TOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      
      state.initialCartTotalAmount = totalAmount;

      if (action.payload && action.payload.coupon !== null) {
        const discountedTotalAmount = applyDiscount(
          totalAmount,
          action.payload.coupon.discount
        );
        state.cartTotalAmount = discountedTotalAmount;
      }else{
        state.cartTotalAmount = totalAmount; //if no coupon is selected.
      }
      
      //localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
  },
  extraReducers(builder) {
    builder
      //saveCartDB:
      .addCase(saveCartDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveCartDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        console.log(action.payload);
      })
      .addCase(saveCartDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      //getCartDB:
      .addCase(getCartDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
        if (action.payload.length > 0) {
          window.location.href = FRONTEND_URL + "/cart";
        } else {
          window.location.href = FRONTEND_URL;
        }
        console.log(action.payload);
      })
      .addCase(getCartDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      });
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;

// .addCase(getCartDB.fulfilled, (state, action) => {
//   state.isLoading = false;
//   state.isSuccess = true;
//   state.isError = false;
//   localStorage.setItem("cartItems", JSON.stringify(action.payload));
//   if (action.payload.length > 0) {
//     window.location.href = FRONTEND_URL + "/cart";
//   } else {
//     window.location.href = FRONTEND_URL;
//   }
//   console.log(action.payload);
// })
