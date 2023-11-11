import { Route, Routes } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import classes from "./AdminHome.module.scss";
import AdminHome from "./AdminHome";
import Category from "../category/Category";
import Brand from "../brand/Brand";
import AddProduct from "../addProduct/AddProduct";
import ViewProducts from "../viewProducts/ViewProducts";
import EditProduct from "../editProduct/EditProduct";
import Coupon from "../coupon/Coupon";
const Admin = () => {
  return (
    <div className={classes.admin}>
      <div className={classes.navbar}>
        <NavBar />
      </div>
      <div className={classes.content}>
        <Routes>
          <Route path="home" element={<AdminHome />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />} />
          
          <Route path="add-product" element={<AddProduct />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
