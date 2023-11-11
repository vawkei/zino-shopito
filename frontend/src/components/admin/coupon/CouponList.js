import "./Coupon.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupon, getCoupons, getSingleCoupon } from "../../../store/coupon/couponIndex";
import {FaTrashAlt} from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const CouponList = () => {

    
    const  {coupons,coupon}  = useSelector((state) => state.coupon);
    console.log(coupons)
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());    
        
  }, [dispatch]);


  const confirmDelete =  (id) => {
    confirmAlert({
      title: "Delete Coupon",
      message: "Are you sure to delete this Coupon?",
      buttons: [
        {
          label: "Delete",
          onClick: () => RemoveCoupon(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const RemoveCoupon = async (id) => {
    await dispatch(deleteCoupon(id));
    await dispatch(getCoupons())
  };


    
    return ( 
        <div className="--mb2">
        <h2>All Coupons</h2>
        <div className="table">
          {coupons.length === 0 ? (
            <p>No coupon found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Discount</th>
                  <th>Date Created</th>
                  <th>Expiry Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.length > 0 && coupons.map((coupon, index) => {
                  return (
                    <tr key={coupon._id}>
                      <td>{index + 1}</td>
                      <td>{coupon.name}</td>
                      <td>{coupon.discount}</td>
                      <td>{new Date(coupon.createdAt).toDateString()}</td>
                      <td>{new Date(coupon.expiresAt).toDateString()}</td>
                      {/* <td>{coupon.createdAt.slice(0,10)}</td> */}
                      <td>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color="red" onClick={()=>confirmDelete(coupon._id)}/>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
     );
}
 
export default CouponList;