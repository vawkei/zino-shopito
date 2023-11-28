import "./OrderDetails.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleOrder } from "../../../store/order/orderIndex";
import { Spinner } from "../../loader/Loader";
import ChangeOrderStatus from "./ChangeOrderStatus";

const OrderDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { isLoading, order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch]);

  return (
    <div className="container table">
      <h2> All Orders</h2>
      <div>
        <Link to={"/admin/orders"}>&larr; Back To Orders</Link>
      </div>
      <br />
      <div className="table">
        {isLoading && order === null ? (
          <Spinner />
        ) : (
          <>
            <p>
              <b>Ship to</b> {order?.shippingAddress?.name}
            </p>
            <p>
              <b>Order Id</b> {order?._id}
            </p>
            <p>
              <b>Order Amount</b> {order?.orderAmount}
            </p>
            <p>
              <b>Coupon</b> {order?.coupon?.name | order?.coupon?.discount} %
              {/* or <b>Coupon</b> {order?.coupon?.name} | {order?.coupon?.discount} % */}
            </p>
            <p>
              <b>Payment Method</b> {order?.paymentMethod}
            </p>
            <p>
              <b>Order Status</b> {order?.orderStatus}
            </p>
            <p>
              <b>Shipping Address</b>
              <br />
              Address: {order?.shippingAddress.line1},
              {order?.shippingAddress.line2}, {order?.shippingAddress.city}
              <br />
              State: {order?.shippingAddress.state}
              <br />
              Country: {order?.shippingAddress.country}
            </p>
            <br />
            {/* Table */}
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order?.cartItems?.map((cart, index) => {
                  const { _id, name, price, image, cartQuantity } = cart;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={image[0]}
                          //src={image[0]}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{cartQuantity}</td>
                      <td>{price * cartQuantity}</td>
                      <td className={"icons"}>
                        <button className="--btn --btn-primary">
                          Review Product
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <ChangeOrderStatus />
          </>
        )}
        
      </div>
    </div>
  );
};

export default OrderDetails;
