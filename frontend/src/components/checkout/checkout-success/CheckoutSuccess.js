import {Link} from "react-router-dom";
import Confetti from "react-confetti";
import { useEffect } from "react";
import { cartActions } from "../../../store/cart/cartIndex";
import {useDispatch} from "react-redux";

const CheckoutSuccess = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(cartActions.CLEAR_CART());
    },[dispatch]);

    return ( 
        <>
        <Confetti />
            <section style={{height:"80vh"}}>
                <div className="container">
                    <h2>Checkout Successful</h2>
                    <p>Thank you for your purchase</p>
                    <br />
                    <button className="--btn --btn-primary">
                        <Link to={"/order-history"}>View Order Status</Link>
                    </button>
                </div>
            </section>
        </>
     );
}
 
export default CheckoutSuccess;