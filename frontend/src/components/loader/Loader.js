import React from "react";
import ReactDOM from "react-dom";
import classes from "./Loader.module.scss";
import loaderImage from "../../assets/loader.gif";
//import spinnerImage from "../../assets/spinner.jpg";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={classes.wrapper}>
      <div className={classes.loader}>
        <img src={loaderImage} alt="loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner =()=>{
    return(
        <div className="--center-all">
            <img src={loaderImage} alt="loading..." />
        </div>
    )
}

export default Loader;
