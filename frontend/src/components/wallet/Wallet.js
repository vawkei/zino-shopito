import "./Wallet.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getuser } from "../../store";
import mcImg from "../../assets/mc_symbol.png";
import { AiFillGift, AiOutlineDollarCircle } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";
import paymentImg from "../../assets/payment.svg";
import WalletTransactions from "./WalletTransactions";
import {
  getUserTransactions,
  transactionSliceActions,
  transferFunds,
  verifyAccount,
} from "../../store/transaction/transactionIndex";
import TransferModal from "./TransferModal";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import DepositModal from "./DepositModal";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

// const transactions = [
//   {
//     _id:"oo7",
//     createdAt:"11-11-23",
//     amount:100,
//     sender:"admin@gmail.com",
//     receiver:"shopito store",
//     description:"Payment for product",
//     status:"success"
//   },
//   {
//     _id:"oo8",
//     createdAt:"11-11-23",
//     amount:200,
//     sender:"ben@gmail.com",
//     receiver:"shopito store",
//     description:"Payment for product",
//     status:"success"
//   },
//   {
//     _id:"oo9",
//     createdAt:"11-11-23",
//     amount:300,
//     sender:"admin@gmail.com",
//     receiver:"shopito store",
//     description:"Payment for product",
//     status:"success"
//   },
//   {
//     _id:"oo6",
//     createdAt:"11-11-23",
//     amount:400,
//     sender:"ben@gmail.com",
//     receiver:"shopito store",
//     description:"Payment for product",
//     status:"success"
//   }
// ]

const initialState = {
  amount: 0,
  sender: "",
  receiver: "",
  description: "",
  status: "",
};

const initialDepositState = {
  depositAmount: 0,
  paymentMethod: "",
};


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading, message, receiversName } = useSelector(
    (state) => state.transaction
  );

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const [transferData, setTransferData] = useState(initialState);
  const { amount, sender, receiver, description, status } = transferData;

  const [depositData, setDepositData] = useState(initialDepositState);
  const { depositAmount, paymentMethod } = depositData;

  const [isVerified, setIsVerified] = useState(false);

  const showTransferModalHandler = () => {
    setShowTransferModal((curr) => true);
  };

  const showDepositModalHandler = () => {
    setShowDepositModal((curr) => true);
  };
  // const closeModal = () => {
  //   setShowTransferModal((curr)=>false)
  // };
  //OR:
  const closeModal = (e) => {
    if (e.target.classList.contains("cm")) {
      setShowTransferModal(false);
      setShowDepositModal(false);
      setTransferData({ ...initialState });
      setDepositData({ ...initialDepositState });
      setIsVerified(false);
    }
  };

  const [urlParams] = useSearchParams();
  const payment = urlParams.get("payment");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
    setIsVerified(false);
    dispatch(transactionSliceActions.RESET_TRANSACTION_MESSAGE());
    dispatch(transactionSliceActions.RESET_RECEIVERS_NAME());
  };

  const verifyReceiversAccount = async () => {
    if (receiver === "") {
      console.log("Please enter receiver's account");
      toast.error("Please enter receiver's account");
      return;
    }
    if (!validateEmail(receiver)) {
      console.log("Please use an actual email");
      toast.error("Please use an actual email");
      return;
    }
    const formData = { receiver };
    dispatch(verifyAccount(formData));
    toast.success("account verified successfully");
    // setShowTransferModal(true)
  };

  const transferMoney = async (e) => {
    e.preventDefault();
    if (amount < 1) {
      toast.error("Please enter a valid amount");
      console.log("Please enter a valid amount");
      return;
    }

    if (description === "") {
      toast.error("Please enter a description");
      console.log("Please enter a description");
      return;
    }
    const formData = {
      ...transferData,
      sender: user.email,
      status: "Success",
    };
    await dispatch(transferFunds(formData));
    await dispatch(getuser());
  };

  const depositMoney =async (e) => {
    e.preventDefault();
    if (depositAmount < 1) {
      toast.error("Please enter an amount > 1");
      console.log("Please enter an amount > 1");
      return;
    }
    if (paymentMethod === "") {
      toast.error("Please select a payment method");
      console.log("Please select a payment method");
      return;
    }
    if (paymentMethod === "flutterwave") {
      /* eslint-disable */
      FlutterwaveCheckout({
        public_key: process.env.REACT_APP_FLW_PK,
        tx_ref: process.env.REACT_APP_TX_REF,
        amount: depositAmount,
        currency: "USD",
        payment_options: "card, banktransfer, ussd",
        redirect_url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/transaction/depositFundsFlutterwave`,
        // meta: {
        //   source: "docs-inline-test",
        //   consumer_mac: "92a3-912ba-1192a",
        // },
        customer: {
          email: user.email,
          phone_number: user.phone,
          name: user.name,
        },
        customizations: {
          title: "Shopito wallet deposit",
          description: "Deposit funds to your shopito wallet",
          logo: "https://checkout.flutterwave.com/assets/img/rave-logo.png",
        },
      });

      return;
    }

    if (paymentMethod === "stripe") {
      const {data} = await axios.post(`${BACKEND_URL}/api/v1/transaction/depositFundsStripe`,{
        amount:depositAmount
      })
      window.location.href = data.url;
      // depositFundsStripe
    }
  };

  const handleDepositInputChange = (e) => {
    const { name, value } = e.target;
    setDepositData({ ...depositData, [name]: value });
  };

  useEffect(() => {
    dispatch(getUserTransactions());
    dispatch(getuser());
  }, [dispatch]);

  useEffect(() => {
    if (message === "Account verification successful") {
      setIsVerified(true);
      dispatch(transactionSliceActions.RESET_TRANSACTION_MESSAGE());
    }
    if (message === "Transaction successful") {
      setTransferData({ ...initialState });
      setIsVerified(false);
      setShowTransferModal(false);

      dispatch(transactionSliceActions.RESET_TRANSACTION_MESSAGE());
      dispatch(transactionSliceActions.RESET_RECEIVERS_NAME());
      dispatch(getUserTransactions());
    }
  }, [dispatch, message]);

  useEffect(() => {
    if (payment === "successful") {
      toast.success("Payment successful");
      setTimeout(function () {
        navigate("/wallet");
      }, 5000);
    }
    if (payment === "failed") {
      toast.error("Payment failed");
    }
  }, [payment, navigate]);

  return (
    <section>
      <div className="container">
        <PageMenu />
        <div className="wallet">
          <div className="wallet-data --flex-start --flex-dir-column">
            <div className="wallet-info --card --mr">
              <span>Hello,</span>
              <h4>{user?.name}</h4>
              <div className="--underline"></div>
              <span className="--flex-between">
                <p>Account Balance</p>
                <img src={mcImg} alt="mc" width={"100"} />
              </span>
              <h4>${user?.balance.toFixed(2)}</h4>
              <div className="buttons --flex-center">
                <buttons
                  className="--btn --btn-primary"
                  onClick={showDepositModalHandler}>
                  <AiOutlineDollarCircle />
                  &nbsp; Deposit Money
                </buttons>
                <buttons
                  className="--btn --btn-danger"
                  onClick={showTransferModalHandler}>
                  <FaRegPaperPlane />
                  &nbsp; Transfer
                </buttons>
              </div>
            </div>
            {/* wallet-promo */}
            <div className="wallet-promo --flex-between --card">
              <div className="wallet-text">
                <span className="--flex-start">
                  <AiOutlineDollarCircle size={25} color="#ff7722" />
                  <h4>Shopito Wallet</h4>
                </span>
                <span className="--flex-start">
                  <h4>Cashback up to 80%</h4>
                  <AiFillGift size={25} color="#007bff" />
                </span>
                <span>
                  Use your shopito wallet at checkout and get up to 80% cashback
                </span>
              </div>
              <div className="wallet-img">
                <img src={paymentImg} alt="pay" width={"150px"} />
              </div>
            </div>
          </div>
          {/* wallet-transactions */}
          {user !== null && (
            <WalletTransactions transactions={transactions} user={user} />
          )}
        </div>
        {showTransferModal && (
          <TransferModal
            transferData={transferData}
            isVerified={isVerified}
            isLoading={isLoading}
            handleInputChange={handleInputChange}
            handleAccountChange={handleAccountChange}
            transferMoney={transferMoney}
            verifyReceiversAccount={verifyReceiversAccount}
            closeModal={closeModal}
            receiversName={receiversName}
          />
        )}
        {showDepositModal && (
          <DepositModal
            depositData={depositData}
            closeModal={closeModal}
            handleDepositInputChange={handleDepositInputChange}
            depositMoney={depositMoney}
          />
        )}
      </div>
    </section>
  );
};

export default Wallet;
