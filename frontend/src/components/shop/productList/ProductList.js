import { BsFillGridFill } from "react-icons/bs";
import classes from "./ProductList.module.scss";
import { FaListAlt } from "react-icons/fa";
import Search from "../../ui/card/search/Search";
import { useEffect, useState } from "react";
import ProductItem from "../productItem/ProductItem";
import {useDispatch, useSelector} from "react-redux"
import { filterActions } from "../../../store/products/filterSlice";
import ReactPaginate from "react-paginate";

const ProductList = (props) => {
  const [grid, setGrid] = useState(true);
  const [search,setSearch] = useState("");
  const [sort,setSort] =useState("latest")

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  const sortChangeHandler = (e)=>{
    setSort(e.target.value)
  };

  const {filteredProducts} = useSelector((state)=>state.filter)
  //console.log(filteredProducts);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(filterActions.FILTER_BY_SEARCH({products:props.products,search}))
  },[dispatch,search,props.products]);

  useEffect(()=>{
    dispatch(filterActions.SORT_PRODUCTS({products:props.products,sort}))
  },[dispatch,sort,props.products])


  //Begin Paginate:
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
//End Paginate



  return (
    <div className={classes["product-list"]}>
      <div className={classes.top}>
        <div className={classes.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            {/* <b>{props.products && props.products.length} found</b> */}
            <b>{props.products && currentItems.length} found</b>
          </p>
        </div>
        <div>
          <Search value={search} onChange={searchChangeHandler} />
        </div>
        <div className={classes.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={sortChangeHandler}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${classes.grid}` : `${classes.list}`}>
         {/* {props.products.length === 0 ? (  */}
         {/* {filteredProducts.length === 0 ? ( */}
         {filteredProducts.length === 0 ? (
          <p>No product found</p>
        ) : (
          <>
            {/* {props.products.map((product) => { */}
            {currentItems.map((product) => {
              return (
                <div key={product._id}>
                  <ProductItem
                    key={product._id}
                    _id={product._id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    ratings={product.ratings}
                    regularPrice={product.regularPrice}
                    description={product.description}
                    quantity={product.quantity}
                    grid={grid}
                    product={product}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
};

export default ProductList;
