import classes from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {FaTrashAlt} from "react-icons/fa";
import { cartActions, saveCartDB } from "../../store/cart/cartIndex";
import Card from "../ui/card/Card";
import { useEffect } from "react";
import VerifyCoupon from "../verifyCoupon/VerifyCoupon";
import PaymentOptions from "../paymentOptions/PaymentOptions";



const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const {cartTotalQuantity} = useSelector((state)=>state.cart);
  const {cartTotalAmount} = useSelector((state)=>state.cart);
  const { coupon } = useSelector((state) => state.coupon);

  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(cartActions.CALCULATE_SUB_TOTAL({coupon}))
    dispatch(cartActions.CALCULATE_TOTAL_QUANTITY())
    // as soon as the cart page loads it runs these functions automatically. And the logic to these functions r in our redux cartIndex.In this case, the actions don't require any additional data from the JSX or component state. If they did require data, you would pass it as an argument within the parentheses when calling the action creator function, like dispatch(cartAction.someAction(payload)).
  },[dispatch,cartItems,coupon]);


  const increaseCart = (product)=>{
    dispatch(cartActions.ADD_TO_CART(product));
     dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  const decreaseCart = (product)=>{
    dispatch(cartActions.DECREASE_CART(product));
     dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  const removeFromCart = (product)=>{
    dispatch(cartActions.REMOVE_FROM_CART(product))
     dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  const clearCart = ()=>{
    dispatch(cartActions.CLEAR_CART())
     dispatch(
      saveCartDB({cartItems:[]})
    );
  };

  return (
    <section className={`container ${classes.table}`}>
      <h3>Shopping Cart</h3>
      {cartItems?.length === 0 ? (
        <>
          <p>Your cart is empty</p>
          <div>
            <Link to={"/shop"}>&larr; Continue Shopping</Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { cartItems?.map((cart, index) => {
                const { _id, name, price, image, cartQuantity } = cart;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img
                        src={image[0]}
                        //src={image[0]}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className={classes.count}>
                    
                          <>
                            <button
                              className="--btn"
                              onClick={() => decreaseCart(cart)}>
                              -
                            </button>
                            <p>
                              <b>{cart.cartQuantity}</b>
                            </p>
                            <button
                              className="--btn"
                              onClick={() => increaseCart(cart)}>
                              +
                            </button>
                          </>
                        
                      </div>
                    </td>
                    <td>{price * cartQuantity}</td>
                    <td className={classes.icons}>
                      <FaTrashAlt
                        size={19}
                        color="red"
                        onClick={() => removeFromCart(cart)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          <div className={classes.summary}>
            <button className="--btn --btn-danger" onClick={()=>clearCart()}>Clear Cart</button>
            <div className={classes.checkout}>
              <div>
                <Link to={"/shop"}>&larr; Continue shopping</Link>
              </div>
              <br />
              <Card cardClass={classes.card}>
                  <p>
                    <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={classes.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`$${cartTotalAmount?.toFixed(2)}`}</h3>
                  </div>
                  <VerifyCoupon />
                  <div className="--underline --my"></div>
                  <PaymentOptions />
              </Card>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
