import classes from "./ProductFilter.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../../store/products/filterSlice";
import { productActions } from "../../../store/products/productIndex";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  const [category, setCategory] = useState("All");
  const [brands, setBrands] = useState("All");
  const [price,setPrice] = useState(3000)
  //const [price, setPrice] = useState([100, 10000]);

  const allCategories = [
    "All",
    ...new Set(
      products.map((product) => {
        return product.category;
      })
    ),
  ];
  const allBrands = [
    "All",
    ...new Set(
      products.map((product) => {
        return product.brand;
      })
    ),
  ];

  const filterProductCategory = (cat) => {
    setCategory(cat);
    dispatch(
      filterActions.FILTER_BY_CATEGORY({ products, category: cat })
    );
    //this sends products and category which takes the cat param as a property to our redux, so we can v access the products and whichever button we clickon in the u.i to the redux store. So if i click on laptop button in the u.i, the onClick={() => filterProductCategory(cat) sends it to the redux store along with products. It also sets setCategory with the laptop cat.
  };

  useEffect(() => {
    dispatch(
      filterActions.FILTER_BY_BRAND({ products: products, brand: brands })
    ); //this sends products and brand to our redux, so we can v access to them in our redux.
  }, [dispatch, products, brands]);


  useEffect(()=>{
    dispatch(filterActions.FILTER_BY_PRICE({products:products,price:price}))
  },[dispatch,products,price]);

  useEffect(() => {
    dispatch(productActions.GET_PRICE_RANGE({ products })); //this sends products to our redux, so we can v access to the minimum and maximum price in our redux.
  }, [dispatch, products]);
  console.log(minPrice, maxPrice);


  const clearFilter=()=>{

  setCategory("All");
  setBrands("All");  
  setPrice(maxPrice);
  // Dispatch actions to clear filters in the Redux store
  dispatch(filterActions.FILTER_BY_CATEGORY({ products, category: "All" }));

  }

  return (
    <div className={classes.filter}>
      <h3>Categories</h3>
      <div className={classes.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${classes.active}` : null}
              onClick={() => filterProductCategory(cat)}>
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Brands</h4>
      <div className={classes.brand}>
        <select value={brands} onChange={(e) => setBrands(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option value={brand} key={index}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h4>Price</h4>
      <p>{`${price}`}</p>
      <div className={classes.price}>
        {/* <Slider  range 
          marks={{
          200: `${price[0]}`,
          10000: `${price[1]}`
        }}
        min={minPrice}
        max={maxPrice}
        defaultValue={[minPrice,maxPrice]}
        tipFormatter= {(value)=> `$${value}`}
        tipProps={{
          placement:"top",
          visible:true
        }}
        value={price}
        onChange={(price)=>setPrice(price)}
        /> */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <br />
      <button className="--btn --btn-danger" onClick={clearFilter}>Clear Filter</button>
    </div>
  );
};

export default ProductFilter;
