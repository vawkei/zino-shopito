import classes from "./MainNavigation.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

export const logo = (
  <div className={classes.logo}>
    <Link to={"/"}>
      <h2>
        Shop<span>Ito</span>
      </h2>
    </Link>
  </div>
);

const MainNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenuHandler = () => {
    setShowMenu((currState) => !currState);
  };

  const hideMenuHandler = () => {
    setShowMenu(false);
  };

  const cart = (
    <span className={classes.cart}>
      <Link to={"/cart"}>
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  );

  const navDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  return (
    <header>
      <div className={classes.header}>
        {logo}
        <nav
          className={
            showMenu ? `${classes["show-nav"]}` : `${classes["hide-nav"]}`
          }>
          <div
            className={
              showMenu
                ? `${classes["nav-wrapper"]} ${classes["show-nav-wrapper"]}`
                : `${classes["nav-wrapper"]}`
            }
            onClick={hideMenuHandler}></div>

          <ul onClick={hideMenuHandler}>
            <li className={classes["logo-mobile"]}>
              {logo} <FaTimes size={22} color="#fff" onClick={hideMenuHandler} />
            </li>
            <li>
              <NavLink to={"/shop"} className={navDataHandler}>
                Shop
              </NavLink>
            </li>
          </ul>
          <div className={classes["header-right"]}>
            <span className={classes.links}>
              <NavLink to={"/login"} className={navDataHandler}>
                Login
              </NavLink>
              <NavLink to={"/register"} className={navDataHandler}>
                Register
              </NavLink>
              <NavLink to={"/order-history"} className={navDataHandler}>
                My Order
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>

        <div className={classes["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenuHandler} />
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
