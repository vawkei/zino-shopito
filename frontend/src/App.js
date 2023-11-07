import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getloginstatus,getuser } from "./store";
import Profile from "./pages/profile/Profile";
import AdminPage from "./pages/admin/AdminPage";

function App() {
  axios.defaults.withCredentials = true //so everytime we make a http request with axios and we need to send a token or credential, it will be set to true automatically. And we ll be able to make the request. so theres no need to add it to every http request we make.

  const dispatch = useDispatch();
const {isLoggedIn,user} = useSelector((state)=>state.auth)

  useEffect(()=>{
    dispatch(getloginstatus())
  },[dispatch]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getuser());
    }
  }, [dispatch,isLoggedIn, user]);

  return (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/*" element={<AdminPage />} /> 
      </Routes>
    </Layout>
  );
}

export default App;
