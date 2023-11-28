import { useDispatch, useSelector } from "react-redux";
import "./VerifyCoupon.scss";
import { useState } from "react";
import { couponActions, deleteCoupon, getSingleCoupon } from "../../store/coupon/couponIndex";
import CartDiscount from "./CartDiscount";
import { toast } from "react-toastify";

const VerifyCoupon = () => {
  const [couponName, setCouponName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { coupon } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const showFormHandler = () => {
    setShowForm(true);
  };
  const removeCoupon = () => {
    dispatch(couponActions.REMOVE_COUPON())
    toast.success("Coupon removed")
  };


  const verifyCoupon = (e) => {
    e.preventDefault();
    dispatch(getSingleCoupon(couponName))
  };



  return (
    <>
      {coupon && <CartDiscount />}

      <div className="--flex-between">
        <p>Have a coupon ?</p>
        {coupon === null ? (
          <p className="--cursor --color-primary" onClick={showFormHandler}>
            <b>Add a coupon</b>
          </p>
        ) : (
          <p className="--cursor --color-primary" onClick={removeCoupon}>
            <b>Remove coupon</b>
          </p>
        )}
      </div>

      {showForm && (
        <form onSubmit={verifyCoupon} className="coupon-form --form-control">
          <input
            type="text"
            placeholder="coupon name"
            name="name"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value.toUpperCase())}
            required
          />
          <button type="submit" className="--btn --btn-primary">
            verify
          </button>
        </form>
      )}
    </>
  );
};

export default VerifyCoupon;
