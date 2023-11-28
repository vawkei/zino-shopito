import { useDispatch, useSelector } from "react-redux";
import classes from "../../checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../ui/card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createOrder } from "../../../store/order/orderIndex";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CheckoutWithFlutterwave = () => {

  const {user} = useSelector((state)=>state.auth);
  const {cartTotalAmount,cartItems} = useSelector((state)=>state.cart);
  const {shippingAddress,paymentMethod} = useSelector((state)=>state.checkout);
  const {coupon} = useSelector((state)=>state.coupon);

  const [urlParams] = useSearchParams()
  const payment = urlParams.get("payment");
  const ref = urlParams.get("ref");

  const dispatch = useDispatch();
  const navigate = useNavigate();



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
    // navigate("/checkout-success")
  };

  useEffect(()=>{
    if(payment==="successful" && ref=== process.env.REACT_APP_TX_REF && cartTotalAmount > 0){
      toast.success("Payment successful");
      saveOrder()
      navigate("/checkout-success")
    }
    if(payment==="failed"){
      toast.error("Payment failed");
    }
    setTimeout(() => {
      if (payment === "successful" && ref === process.env.REACT_APP_TX_REF) {
        navigate("/checkout-success");
      }
    }, 5000);
  },[payment, cartTotalAmount, navigate, ref]);

  function makePayment() {
    /* eslint-disable */
    FlutterwaveCheckout({
      public_key: process.env.REACT_APP_FLW_PK,
      tx_ref: process.env.REACT_APP_TX_REF,
      amount: cartTotalAmount,
      currency: "USD",
      payment_options: "card, banktransfer, ussd",
      redirect_url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/response`,
      // meta: {
      //   source: "docs-inline-test",
      //   consumer_mac: "92a3-912ba-1192a",
      // },
      customer: {
        email: user.email,
        phone_number: user.phone,
        name: user.name,
      },
      customizations: {
        title: "Shopito online store",
        description: "Payment for Products",
        logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
      },
    });
  }


    return ( 
        <>
        <section>
          <div className={`container ${classes.checkout}`}>
            <h2>Checkout</h2>
            <form >
              <div>
                <Card cardClass={classes.card}>
                  <CheckoutSummary />
                </Card>
              </div>
  
              <div>
                <Card className={`${classes.card} ${classes.pay}`}>
                  <h3>Flutterwave Checkout</h3>                  
                  
                  <button type="button" className={classes.button} onClick={makePayment}>
                    Pay Now
                  </button>
                  
                </Card>
              </div>
            </form>
          </div>
        </section>
      </>
     );
}
 
export default CheckoutWithFlutterwave;