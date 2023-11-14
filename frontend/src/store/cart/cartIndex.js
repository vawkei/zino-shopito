import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCartQuantityById } from "../../utils";

const initialCartState = {
  //cartItems:[],
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalAmount: 0,
  fixedCartTotalAmount: 0,
  cartTotalQuantity: 0,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

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
         state.cartItems[productIndex].cartQuantity -= 1
        toast.success(`${action.payload.name} quantity decreased by one`,{position:"top-left"})
      } else if(state.cartItems[productIndex].cartQuantity ===1) {
        //If the quantity of the product is only one, 
        // we remove the product entirely from the cart:
        const newCartItems = state.cartItems.filter((item)=>{
          return item._id !==action.payload._id
        })
        state.cartItems = newCartItems
        toast.success(`${action.payload.name} removed from cart`,{position:"top-left"})
      }
      //save to localStorage:
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;
