import { useEffect, useState } from "react";
import classes from "./Product.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products/productIndex";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import { Spinner } from "../loader/Loader";
import { FaCogs } from "react-icons/fa";

const Product = () => {

  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);
  const [showFilter, setShowFilter] = useState(false);
  

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  
const toggleFilter = () => {
    setShowFilter((currState) => !currState);
  };


  return (
    <section>
      <div className={`container ${classes.product}`}>
        <aside
          className={
            showFilter ? `${classes.filter} ${classes.show}` : `${classes.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={classes.content}>
          {isLoading ? <Spinner /> : <ProductList products={products} />}
          <div className={classes.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
