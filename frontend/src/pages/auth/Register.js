import classes from "./Auth.module.scss";
import Card from "../../components/ui/card/Card";

import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import { authActions, register } from "../../store";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";


const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, cPassword } = formData;

  const {isLoading,isLoggedIn,isSuccess} =useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    // we validate on both frontend and backend. reason for validating on the frontend is so as to prevent alot of request coming into the server, and using up the server.
    if (!name || !password) {
      return toast.error("All fields are required");
    }
    if (password.trim().length < 6) {
      return toast.error("Password should be at least 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== cPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = { name, email, password };

    await dispatch(register(userData));

    //console.log(name,email,password,cPassword)
  };

  useEffect(()=>{
    if(isSuccess && isLoggedIn){
      navigate("/");
      // dispatch(authActions.RESET_AUTH())
    }
    dispatch(authActions.RESET_AUTH())
  },[isSuccess,isLoggedIn,dispatch,navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${classes.auth}`}>
        <Card>
          <div className={classes.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="name"
                required
                name="name"
                value={name}
                onChange={handleInputChange}
              />

              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                required
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="confirm password"
                name="cPassword"
                value={cPassword}
                required
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={classes.register}>
              <p>Already have an account?</p>
              <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </Card>

        <div className={classes.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
