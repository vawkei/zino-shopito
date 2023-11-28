import { useState } from "react";
import classes from "./ChangeOrderStatus.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../../store/order/orderIndex";
import { useParams } from "react-router-dom";
import Card from "../../ui/card/Card";
import { Spinner } from "../../loader/Loader";

const ChangeOrderStatus = () => {
  const { id } = useParams();

  const [status, setStatus] = useState("");

  const statusChangeHandler = (e) => {
    setStatus(e.target.value);
  };

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.order);

  async function updateOrder(e, id) {
    e.preventDefault();

    const formData = {
        orderStatus:status
    };
    console.log(formData)
    
    await dispatch(updateOrderStatus({id,formData}));
  }

  return (
    <div>
      {isLoading && <Spinner />}
      <div className={classes.status}>
        <Card cardClass={classes.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => updateOrder(e, id)}>
            <span>
              <select value={status} onChange={statusChangeHandler}>
                <option value="" disabled>
                  --Choose one--
                </option>
                <option value="Order placed">Order Placed...</option>
                <option value="Processing">Processing...</option>
                <option value="Shipped">Shipped...</option>
                <option value="Delivered">Delivered...</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ChangeOrderStatus;
