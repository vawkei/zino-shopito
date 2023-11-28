import "./Checkout.scss";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { extractIdAndCartQuantity } from "../../utils";
import CheckoutForm from "./checkoutForm/CheckoutForm";
import { toast } from "react-toastify";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

// const Checkout = () => {

//  const stripe = useStripe();
//   const elements = useElements();


//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret"
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           setMessage("Payment succeeded!");
//           break;
//         case "processing":
//           setMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           setMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           setMessage("Something went wrong.");
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js hasn't yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: "http://localhost:3000",
//       },
//     });

//     // This point will only be reached if there is an immediate error when
//     // confirming the payment. Otherwise, your customer will be redirected to
//     // your `return_url`. For some payment methods like iDEAL, your customer will
//     // be redirected to an intermediate site first to authorize the payment, then
//     // redirected to the `return_url`.
//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occurred.");
//     }

//     setIsLoading(false);
//   };

//   const paymentElementOptions = {
//     layout: "tabs"
//   }

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>

//       <PaymentElement id="payment-element" options={paymentElementOptions} />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
//         </span>
//       </button>
//       {/* Show any error or success messages */}
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );

  
// };

// export default Checkout;





const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const {user} = useSelector((state)=>state.auth)
  const {cartItems,cartTotalQuantity,cartTotalAmount} = useSelector((state)=>state.cart);
  const shippingAddressRedux = useSelector((state)=>state.checkout.shippingAddress);
  const billingAddressRedux = useSelector((state)=>state.checkout.billingAddress);
  const {coupon}  = useSelector((state)=>state.coupon);

  const description = `Shopito payment: by email: ${user.email}, amount: ${cartTotalAmount}`;

  const productIDsAndcartQuantity = extractIdAndCartQuantity(cartItems);
  // console.log(newCartItems);
  // const newCartTotalAmount = calculateTotalPrice(cartItems, productIDs);
  // console.log(newCartTotalAmount);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/order/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: productIDsAndcartQuantity,
          shipping :shippingAddressRedux,
          billing: billingAddressRedux,
          description:description,
          coupon:coupon
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
        console.log(error)
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {/* <pre>{JSON.stringify(newCartItems, null, 2)}</pre> */}
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
