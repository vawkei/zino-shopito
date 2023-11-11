import { FaUserCircle } from "react-icons/fa";
import classes from "./NavBar.module.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((state) => state.auth.user);
  const UserName = user ? user.name : "";

  const navDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{UserName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to={"/admin/home"} className={navDataHandler}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/all-products"} className={navDataHandler}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/add-product"} className={navDataHandler}>
              Add Products
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/coupon"} className={navDataHandler}>
              Coupon
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/category"} className={navDataHandler}>
              Category
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/brand"} className={navDataHandler}>
              Brand
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
