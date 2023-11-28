import "./DepositModal.scss";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import { useEffect, useRef } from "react";

const DepositModal = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);




  return (
    <section className="--100vh modal-section">
      <div className="--flex-center modal">
        <div className="--bg-light --p --card modal-content">
          <AiOutlineClose
            size={16}
            color="red"
            className="close-icon cm"
            onClick={props.closeModal}
            // onClick={(e) => props.closeModal(e)}
          />
          <div className="--flex-start modal-head m-y">
            <AiOutlineInfoCircle size={18} color="orangered" />
            <h3 className="--text-p --ml"> Deposit money into your wallet</h3>
          </div>
          <div className="modal-body">
            <form onSubmit ={props.depositMoney}>
              <p className="req">
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="amount"
                  required
                  name="depositAmount"
                  ref={inputRef}
                  value={props.depositData.depositAmount}
                  onChange={props.handleDepositInputChange}
                />
              </p>

              <p>
                <label htmlFor="stripe" className="radio-label">
                  <input
                    type="radio"
                    className="radio-input"
                    name="paymentMethod"
                    id="stripe"
                    value={"stripe"}
                    onChange={props.handleDepositInputChange}
                  />
                  <span className="custom-radio"></span>
                  Stripe
                </label>
                <br />
                <label htmlFor="flutterwave" className="radio-label">
                  <input
                    type="radio"
                    className="radio-input"
                    name="paymentMethod"
                    id="flutterwave"
                    value={"flutterwave"}
                    onChange={props.handleDepositInputChange}
                  />
                  <span className="custom-radio"></span>
                  Flutterwave
                </label>
              </p>

              <span className="--flex-end">
                <button
                  className="--btn --btn-lg cm"
                  onClick={props.closeModal}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-lg cm"
                  >
                  Proceed
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositModal;
