import classes from "./CheckoutSummary.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../../store/cart/cartIndex";
import Card from "../../ui/card/Card";
import CartDiscount from "../../verifyCoupon/CartDiscount";

const CheckoutSummary = () => {
  const dispatch = useDispatch();
  const { coupon } = useSelector((state) => state.coupon);
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(cartActions.CALCULATE_SUB_TOTAL({ coupon }));
  }, [dispatch, cartItems, coupon]);

  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in cart</p>
            <button className="--btn">
              <Link>&larr; Back to shop</Link>
            </button>
          </>
        ) : (
            <div>
            <p>
              <b>{`Cart Item(s): ${cartTotalQuantity}`}</b>
            </p>
            <div className={classes.text}>
                <h4>Subtotal:</h4>
                <h3>{cartTotalAmount.toFixed(2)}</h3>
          </div>
          <CartDiscount />
            {cartItems.map((item)=>{
                const {_id,name,price,cartQuantity} = item;
                return(
                    <Card key={_id} cardClass={classes.card}>
                            <h4>Product:{name}</h4>
                            <p>Quantity:{cartQuantity}</p>
                            <p>Unit Price:{price}</p>
                            <p>Set Price:{price *cartQuantity}</p>
                    </Card>
                )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
