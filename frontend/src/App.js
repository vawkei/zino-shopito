import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page/HomePage";
import Layout from "./components/layout/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getloginstatus, getuser } from "./store";
import Profile from "./pages/profile/Profile";
import AdminPage from "./pages/admin/AdminPage";
import AdminOnlyRoute from "./components/admin/hideAdmin/AdminOnlyRoute";
import NotFound from "./pages/404/NotFound";
import ShopPage from "./pages/shopPage/ShopPage";
import ProductDetails from "./components/shop/productDetails/ProductDetails";
import CartPage from "./pages/cartPage/CartPage";
import CheckoutDetailsPage from "./pages/CheckoutDetailsPage";
import Checkout from "./components/checkout/Checkout";
import CheckoutSuccessPage from "./pages/checkoutSuccessPage/CheckoutSuccessPage";
import OrderDetailsPage from "./pages/orderDetailsPage/OrderDetailsPage";
import OrderHistoryPage from "./pages/orderHistoryPage/OrderHistoryPage";
import CheckoutWithFlutterwave from "./components/checkout/checkoutWithFlutterwave/CheckoutWithFlutterwave";
import CheckoutWithPaypal from "./components/checkout/checkoutWithPaypal/CheckoutWithPaypal";

import WalletPage from "./pages/walletPage/WalletPage";

function App() {
  axios.defaults.withCredentials = true; //so everytime we make a http request with axios and we need to send a token or credential, it will be set to true automatically. And we ll be able to make the request. so theres no need to add it to every http request we make.

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getloginstatus());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && user === null) {
      dispatch(getuser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <AdminPage />
            </AdminOnlyRoute>
          }
        />
        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/order-details/:id" element={<OrderDetailsPage />} />
        <Route path="/checkout-details" element={<CheckoutDetailsPage />} />
        <Route path="/checkout-stripe" element={<Checkout />} />
        <Route path="/checkout-flutterwave" element={<CheckoutWithFlutterwave />} />
        <Route path="/checkout-paypal" element={<CheckoutWithPaypal />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
