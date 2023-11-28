import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import "./TransferModal.scss";
import { useEffect, useRef } from "react";

const TransferModal = (props) => {
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
            <h3 className="--text-p --ml"> Send Money</h3>
          </div>
          <div className="modal-body">
            <form onSubmit={props.transferMoney}>
              <p className="req">
                <label>Amount</label>
                <input
                  type="number"
                  placeholder="amount"
                  required
                  name="amount"
                  ref={inputRef}
                  value={props.transferData.amount}
                  onChange={props.handleInputChange}
                />
              </p>
              <p className="req">
                <label>Receiver's account</label>
                {props.receiversName !== "" && (
                  <p style={{ color: "red" }}>{props.receiversName}</p>
                )}
                <span className="--flex-end">
                  <input
                    type="text"
                    placeholder="Receiver's account"
                    required
                    name="receiver"
                    value={props.transferData.receiver}
                    onChange={props.handleAccountChange}
                  />
                  <input
                    type="button"
                    className="--btn --btn-danger --btn-lg"
                    name="verify"
                    value={"verify"}
                    // onClick={props.verifyReceiversAccount}
                    //OR
                    onClick={() => props.verifyReceiversAccount()}
                  />
                </span>
              </p>

              <p className="req">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  required
                  name="description"
                  value={props.transferData.description}
                  onChange={props.handleInputChange}
                />
              </p>
              {!props.isVerified && (
                <p className="--color-danger">
                  Please click the verify button above
                </p>
              )}
              {props.isVerified && (
                <span className="--flex-end">
                  <button
                    className="--btn --btn-lg cm"
                    onClick={props.closeModal}>
                    Cancel
                  </button>
                  {props.isLoading ? (
                    <button
                      type="button"
                      className="--btn --btn-primary --btn-lg cm"
                      disabled>
                      Sending...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="--btn --btn-primary --btn-lg cm">
                      Send
                    </button>
                  )}
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferModal;
