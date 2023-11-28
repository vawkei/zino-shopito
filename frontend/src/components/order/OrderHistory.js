import  "./OrderHistory.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrders } from "../../store/order/orderIndex";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, orders } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleClick = (id)=>{
    navigate(`/order-details/${id}`)
  }

  return (
    <section>
      <div className="container order">
        <h2>My Order History</h2>
        <p>
          Open an order to leave a <b> Product review</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className="table">
            {orders.length === 0 ? (
              <p>No Order Found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order Id</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      _id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={_id} onClick={()=>handleClick(_id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{_id}</td>
                        <td>${orderAmount}</td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered" ? "pending" : "delivered"}>
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
