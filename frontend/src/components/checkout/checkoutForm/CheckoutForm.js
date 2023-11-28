import classes from "./CheckoutForm.module.scss";

//this is got from the stripe.com/docs/payments/  checkoutForm.jsx
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import Card from "../../ui/card/Card";
import { toast } from "react-toastify";
import { Spinner } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../store/order/orderIndex";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {cartTotalAmount,cartItems} = useSelector((state)=>state.cart);
  const {shippingAddress,paymentMethod} = useSelector((state)=>state.checkout);
  const {coupon} = useSelector((state)=>state.coupon);

  const saveOrder = () => {
    const today = new Date();
    const formData = {
      orderDate:today.toLocaleDateString(),
      orderTime:today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus:"Order placed...",
      cartItems:cartItems,
      shippingAddress: shippingAddress,
      paymentMethod:paymentMethod,
     coupon:coupon
     //or: // coupon:coupon !== null ? coupon : {name:"nill"}
    }
    dispatch(createOrder(formData));
    //console.log("order successful and saved");
    navigate("/checkout-success")
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.REACT_APP_FRONTEND_URL}/checkout-success`,
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error);
          setMessage(result.error);
          console.log(result.error)
          console.log(result)
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <section>
        <div className={`container ${classes.checkout}`}>
          <h2>Checkout</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <Card cardClass={classes.card}>
                <CheckoutSummary />
              </Card>
            </div>

            <div>
              <Card className={`${classes.card} ${classes.pay}`}>
                <h3>Stripe Checkout</h3>
                <PaymentElement
                  id={classes["payment-element"]}
                  options={paymentElementOptions}
                />
                <button
                  disabled={isLoading || !stripe || !elements}
                  id="submit"
                  className={classes.button}
                  >
                  <span id="button-text">
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      "Pay now"
                    )}
                  </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id={classes["payment-element"]}>{message}</div>}
              </Card>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
