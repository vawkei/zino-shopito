import classes from "./Auth.module.scss";
import Card from "../../components/ui/card/Card";

import loginImg from "../../assets/login.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import Loader from "../../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { authActions, login } from "../../store";
import { cartActions, getCartDB, saveCartDB } from "../../store/cart/cartIndex";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [urlParams] = useSearchParams();
  console.log(urlParams.get("redirect"));

  const redirect = urlParams.get("redirect");

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = { email, password };
    console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      if (redirect === "cart") {
        dispatch(
          saveCartDB({
            cartItems: JSON.parse(localStorage.getItem("cartItems")),
          })
        );
        return navigate("/cart");
      }
      //navigate("/") handled already in cartIndex
      dispatch(getCartDB()); //dis loads what was in the users cart b4 he/she logedout
    }
    dispatch(authActions.RESET_AUTH());
  }, [isLoading, isSuccess, dispatch, navigate, redirect]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${classes.auth}`}>
        <div className={classes.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <Card>
          <div className={classes.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
            </form>
            <span className={classes.register}>
              <p>Don't have an account?</p>
              <Link to={"/register"}>Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
