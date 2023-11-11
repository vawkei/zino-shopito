import { useDispatch } from "react-redux";
import "./Coupon.scss";
import CouponList from "./CouponList";
import CreateCoupon from "./CreateCoupon";
import { getCoupons } from "../../../store/coupon/couponIndex";

const Coupon = () => {

  const dispatch = useDispatch();

  const reloadCoupon = ()=>{
    dispatch(getCoupons())
  };

  return (
    <section>
      <div className="container coupon">
        <CreateCoupon reloadCoupon={reloadCoupon} />
        <CouponList />
      </div>
    </section>
  );
};

export default Coupon;
