import { useDispatch, useSelector } from "react-redux";
import classes from "../../checkout/checkoutForm/CheckoutForm.module.scss";
import Card from "../../ui/card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../store/order/orderIndex";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutWithPaypal = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartTotalAmount, cartItems } = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = useSelector(
    (state) => state.checkout
  );
  const { coupon } = useSelector((state) => state.coupon);

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CID,
    currency: "USD",
    intent: "capture",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveOrder = () => {
    const today = new Date();
    const formData = {
      orderDate: today.toLocaleDateString(),
      orderTime: today.toLocaleTimeString(),
      orderAmount: cartTotalAmount,
      orderStatus: "Order placed...",
      cartItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      coupon: coupon,
      //or: // coupon:coupon !== null ? coupon : {name:"nill"}
    };
    dispatch(createOrder(formData));
    console.log("order successful and saved");
    navigate("/checkout-success");
  };
  return (
    <>                                 
      <PayPalScriptProvider options={ initialOptions }>
        <section>
          <div className={`container ${classes.checkout}`}>
            <h2>Checkout</h2>
            <form>
              <div>
                <Card cardClass={classes.card}>
                  <CheckoutSummary />
                </Card>
              </div>

              <div>
                <Card className={`${classes.card} ${classes.pay}`}>
                  <h3>Paypal Checkout</h3>
                  <PayPalButtons createOrder={(data,actions)=>{
                    return actions.order.create({
                        purchase_units:[
                            {
                                amount:{
                                    value:cartTotalAmount
                                }
                            }
                        ]
                    })
                  }}  onApprove={(data,actions)=>{
                    return actions.order.capture()
                    .then((details)=>{
                        const status= details.status
                        console.log(details.status)
                        if(status==="COMPLETED"){
                            toast.success("Payment successful")
                            saveOrder()
                        }
                    })
                  }}/>
                </Card>
              </div>
            </form>
          </div>
        </section>
      </PayPalScriptProvider>
    </>
  );
};

export default CheckoutWithPaypal;












// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// export default function App() {
//     function createOrder() {
//         return fetch("/my-server/create-paypal-order", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             // use the "body" param to optionally pass additional order information
//             // like product ids and quantities
//             body: JSON.stringify({
//                 cart: [
//                     {
//                         id: "YOUR_PRODUCT_ID",
//                         quantity: "YOUR_PRODUCT_QUANTITY",
//                     },
//                 ],
//             }),
//         })
//             .then((response) => response.json())
//             .then((order) => order.id);
//     }
//     function onApprove(data) {
//           return fetch("/my-server/capture-paypal-order", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               orderID: data.orderID
//             })
//           })
//           .then((response) => response.json())
//           .then((orderData) => {
//                 const name = orderData.payer.name.given_name;
//                 alert(`Transaction completed by ${name}`);
//           });

//         }
//     }
//     return (
//         <PayPalScriptProvider options={{ clientId: "test" }}>
//             <PayPalButtons
//                 createOrder={createOrder}
//                 onApprove={onApprove}
//             />
//         </PayPalScriptProvider>
//     );
// }