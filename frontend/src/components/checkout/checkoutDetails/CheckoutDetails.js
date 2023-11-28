import { useEffect, useState } from "react";
import classes from "./CheckoutDetails.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import Card from "../../ui/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import { checkoutActions } from "../../../store/checkout/CheckoutIndex";
import {toast} from "react-toastify";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";


const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};
const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentMethod = useSelector((state)=>state.checkout.paymentMethod)
  const shippingAddressRedux = useSelector((state)=>state.checkout.shippingAddress);
  const billingAddressRedux = useSelector((state)=>state.checkout.billingAddress);

  useEffect(()=>{
    if(Object.keys(shippingAddressRedux).length>0){
      setShippingAddress({...shippingAddressRedux})
    };
    if(Object.keys(billingAddressRedux).length>0){
      setBillingAddress({...billingAddressRedux})
    }
  },[shippingAddressRedux,billingAddressRedux])

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(checkoutActions.SAVE_SHIPPING_ADDRESS(shippingAddress));
     dispatch(checkoutActions.SAVE_BILLING_ADDRESS(billingAddress));

     if(paymentMethod===""){
      toast.error("Please select a payment method");
      navigate("/cart")
     };
     if(paymentMethod==="stripe"){
      navigate("/checkout-stripe")
     };
     if(paymentMethod==="flutterwave"){
      navigate("/checkout-flutterwave")
     };
     if(paymentMethod==="paypal"){
      navigate("/checkout-paypal")
     };
     if(paymentMethod==="wallet"){
      navigate("/checkout-wallet")
     };
  };

  return (
    <section>
      <div className={`container ${classes.checkout}`}>
        <h2>Checkout Lisa Lipps Details</h2>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <Card cardClass={classes.card}>
              <h3>shippingAddress</h3>
              <label htmlFor="">Recipient Name</label>
              <input
                type="text"
                placeholder="recipient name"
                required
                name="name"
                value={shippingAddress.name}
                onChange={handleShipping}
              />
              <label htmlFor="">Address line 1:</label>
              <input
                type="text"
                placeholder="line 1"
                name="line1"
                value={shippingAddress.line1}
                onChange={handleShipping}
                required
              />

              <label htmlFor="">Address line 2:</label>
              <input
                type="text"
                placeholder="line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={handleShipping}
              />

              <label htmlFor="">City:</label>
              <input
                type="text"
                placeholder="city"
                name="city"
                value={shippingAddress.city}
                onChange={handleShipping}
                required
              />

              <label htmlFor="">State:</label>
              <input
                type="text"
                placeholder="state"
                name="state"
                value={shippingAddress.state}
                onChange={handleShipping}
                required
              />

              <label htmlFor="">Postal Code:</label>
              <input
                type="text"
                placeholder="postal code"
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={handleShipping}
                required
              />
              <label htmlFor="">Country</label>
              <CountryDropdown
                className={classes.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({ target: { name: "country", value: val } })
                }
              />
              <label htmlFor="">Phone:</label>
              <input
                type="text"
                placeholder="phone"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleShipping}
                required
              />
            </Card>
            {/* BILLING ADDRESS */}
            <Card cardClass={classes.card}>
              <h3>Billing Address</h3>
              <label htmlFor="">Recipient Name:</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                value={billingAddress.name}
                onChange={handleBilling}
                required
              />

              <label htmlFor="">Address line 1:</label>
              <input
                type="text"
                placeholder="line 1"
                name="line1"
                value={billingAddress.line1}
                onChange={handleBilling}
                required
              />

              <label htmlFor="">Address line 2:</label>
              <input
                type="text"
                placeholder="line 2"
                name="line2"
                value={billingAddress.line2}
                onChange={handleBilling}
              />

              <label htmlFor="">City:</label>
              <input
                type="text"
                placeholder="city"
                name="city"
                value={billingAddress.city}
                onChange={handleBilling}
                required
              />

              <label htmlFor="">State:</label>
              <input
                type="text"
                placeholder="state"
                name="state"
                value={billingAddress.state}
                onChange={handleBilling}
                required
              />

              <label htmlFor="">Postal Code:</label>
              <input
                type="text"
                placeholder="postal code"
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={handleBilling}
                required
              />
              <label htmlFor="">Country</label>
              <CountryDropdown
                valueType="short"
                className={classes.select}
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({ target: { name: "country", value: val } })
                }
              />

              <label htmlFor="">Phone:</label>
              <input
                type="text"
                placeholder="phone"
                name="phone"
                value={billingAddress.phone}
                onChange={handleBilling}
                required
              />
              <button type="submit" className="--btn --btn-primary">Proceed to Checkout</button>
            </Card>
          </div>
          <div>
            <Card cardClass={classes.card}>
                <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
