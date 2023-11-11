import { useState } from "react";
import Card from "../../ui/card/Card";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { createCoupon } from "../../../store/coupon/couponIndex";

const CreateCoupon = (props) => {
  const [name, setName] = useState("");

  const [discount, setDiscount] = useState(0);
  const [expiresAt, setExpiresAt] = useState(new Date());

  const { isLoading } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const saveCoupon = async (e) => {
    e.preventDefault();

    if(name.length < 5){
        toast.error("Coupon must be up to 5 characters");
        return
    };
    if(discount.length <1){
        toast.error("Discount must be greater than 1")
        return
    };
    //console.log(name,discount,expiresAt)
    const formData={name,discount,expiresAt}
    await dispatch(createCoupon(formData));
    props.reloadCoupon()
    setName("");
    setDiscount(0);
    setExpiresAt(new Date())
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="--mb2">
        <h3>Create Coupon</h3>
        <p>
          Use this form to <b>Create a Coupon</b>
        </p>
        <Card className="card">
          <br />
          <form onSubmit={saveCoupon}>
            <label htmlFor="">Coupon Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="">Coupon Discount:</label>
            <input
              type="number"
              name="discount"
              value={discount}
              required
              onChange={(e) => setDiscount(e.target.value)}
            />
            <label htmlFor="">Expiry Date:</label>
            <DatePicker
              selected={expiresAt}
              value={expiresAt}
              onChange={(date) => setExpiresAt(date)}
            />
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Coupon
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateCoupon;
