import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getloginstatus } from "./store";
import Profile from "./pages/profile/Profile";

function App() {
  axios.defaults.withCredentials = true //so everytime we make a http request with axios and we need to send a token or credential, it will be set to true automatically. And we ll be able to make the request. so theres no need to add it to every http request we make.

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getloginstatus())
  },[dispatch]);


  return (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
