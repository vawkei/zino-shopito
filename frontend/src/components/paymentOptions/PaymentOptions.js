import { useState } from "react";
import "./Radio.scss";
import { toast } from "react-toastify";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { checkoutActions } from "../../store/checkout/CheckoutIndex";

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const {isLoggedIn} = useSelector((state)=>state.auth);
  


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const setPayment = (e) => {
    e.preventDefault();
    if(paymentMethod ===""){
      toast.error("Please select a payment method")
      return
    };
    dispatch(checkoutActions.SAVE_PAYMENT_METHOD(paymentMethod));
    //console.log(paymentMethod)
    if(isLoggedIn){
       navigate("/checkout-details")
    }else{
      navigate("/login?redirect=cart")
    }
    
  };

  return (
    <>
      <p>Please choose a payment method</p>
      <form onSubmit={setPayment} className="--form-control">
        <label htmlFor="stripe" className="radio-label">
          <input
            type="radio"
            className="radio-input"
            name="paymentMethod"
            id="stripe"
            value={"stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="custom-radio"></span>Stripe
        </label>
        <label htmlFor="flutterwave" className="radio-label">
          <input
            type="radio"
            className="radio-input"
            name="paymentMethod"
            id="flutterwave"
            value={"flutterwave"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="custom-radio"></span>Flutterwave
        </label>
        <label htmlFor="paypal" className="radio-label">
          <input
            type="radio"
            className="radio-input"
            name="paymentMethod"
            id="paypal"
            value={"paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="custom-radio"></span>Paypal
        </label>
        <label htmlFor="wallet" className="radio-label">
          <input
            type="radio"
            className="radio-input"
            name="paymentMethod"
            id="wallet"
            value={"wallet"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span className="custom-radio"></span>Wallet
        </label>
        <button type="submit" className="--btn --btn-primary --btn-block">Checkout</button>
      </form>
    </>
  );
};

export default PaymentOptions;
