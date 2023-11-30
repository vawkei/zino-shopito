import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../../store/products/productIndex";
import Search from "../../ui/card/search/Search";
import { Spinner } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai"
import { Link } from "react-router-dom";
import { shortenText } from "../../../utils";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const ViewProducts = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.isLoading);
  console.log(products);

  useEffect(() => {
    if (isLoggedIn===true && products.length===0) {
      dispatch(getProducts());
    }
  }, [isLoggedIn, dispatch]);


  const confirmDelete =  (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure to delete this Product?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };


//DeleteProduct:
const removeProduct =async (id)=>{
  await dispatch(deleteProduct(id));
  await dispatch(getProducts());
}


  //Begin Paginate:
  const itemsPerPage = 2;
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
//End Paginate

  return (
    <section>
      <div className="container product-list">
        <div className="table">
          <div className="--flex-between --flex-dir--column">
            <span>
              <h3>All products</h3>
              <p>
                ~ <b>{products.length}</b> Product found
              </p>
            </span>
            <span>
              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
          </div>
        </div>

        {isLoading && <Spinner />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {products.map((product, index) => { */}
                {currentItems.map((product, index) => {
                  return (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td> {shortenText(product.name,16)}</td>
                      <td>{product.category}</td>
                      <td>$ {product.price}</td>
                      <td>{product.quantity}</td>
                      <td>$ {product.quantity * product.price}</td>
                      <td className="icons">
                        <span>
                          <Link to={"/"}>
                          <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/admin/edit-product/${product._id}`}>
                          <FaEdit size={20} color="green" />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt size={20} color="red" onClick={()=>confirmDelete(product._id)} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
    </section>
  );
};

export default ViewProducts;
