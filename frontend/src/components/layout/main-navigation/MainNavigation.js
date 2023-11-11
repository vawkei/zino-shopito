import classes from "./MainNavigation.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { authActions, logout } from "../../../store";
import { UserName } from "../../../pages/profile/Profile";
import { AdminOnlyLink } from "../../admin/hideAdmin/AdminOnlyRoute";


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
  const [scrollPage,setScrollPage] = useState(false);

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  const navigate =useNavigate();
  const dispatch = useDispatch();

  const fixedNavBar =()=>{
    if(window.scrollY >50){
      setScrollPage(true)
    }else{
      setScrollPage(false)
    }
  };
  window.addEventListener('scroll',fixedNavBar)

  const toggleMenuHandler = () => {
    setShowMenu((currState) => !currState);
  };

  const hideMenuHandler = () => {
    setShowMenu(false);
  };

  const logOutUser =async ()=>{
   await dispatch(logout());
   await dispatch(authActions.RESET_AUTH()) 
   navigate('/login')   
  }

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
    <header className={scrollPage ? `${classes.fixed}`:""}>
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
            
            <li>
            <AdminOnlyLink>
              <NavLink to={"/admin/home"} className={navDataHandler}>
                | Admin
              </NavLink>
              </AdminOnlyLink>
            </li>
            
          </ul>
          <div className={classes["header-right"]}>
            <span className={classes.links}>
              
              {!isLoggedIn && <NavLink to={"/login"} className={navDataHandler}>
                Login
              </NavLink>}              
              
              {isLoggedIn && <NavLink to={"/profile"}>
                <FaUserCircle size={16} color="ff7722" /> <UserName />  
              </NavLink>}

              {!isLoggedIn && <NavLink to={"/register"} className={navDataHandler}>
                Register
              </NavLink>}


             {isLoggedIn && <NavLink to={"/order-history"} className={navDataHandler}>
                My Order
              </NavLink>}

              {isLoggedIn && <Link to={"/"} onClick={logOutUser}>
                Logout
              </Link>}
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
