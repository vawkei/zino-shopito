import "./VerifyCoupon.scss";
import {  useSelector } from "react-redux";
import Card from "../ui/card/Card";

const CartDiscount = () => {
  const { coupon } = useSelector((state) => state.coupon);
  const { initialCartTotalAmount } = useSelector(
    (state) => state.cart
  );
  return (
    <>
      <Card cardClass="coupon-msg">
        <p className="--center-all">
            Initial total: ${initialCartTotalAmount} |
            Coupon: {coupon?.name} |
            Discount:{coupon?.discount}%
        </p>
      </Card>
    </>
  );
};

export default CartDiscount;
