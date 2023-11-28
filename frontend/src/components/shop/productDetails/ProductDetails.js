import { useDispatch, useSelector } from "react-redux";
import classes from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProduct } from "../../../store/products/productIndex";
import { Spinner } from "../../loader/Loader";
import ProductRating from "../productRating/ProductRating";
import { calculateAverageRatings, shortenText } from "../../../utils";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import Card from "../../ui/card/Card";
import { cartActions, saveCartDB } from "../../../store/cart/cartIndex";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  //console.log(id);
  const [imageIndex, setImageIndex] = useState(0);
  const { product, isLoading } = useSelector((state) => state.product);
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  const cart = cartItems.find((item) => {
    return item._id === id;
  });
  //console.log(cart); //if item/id is not in cart, it returns undefined. but if its in cart, it returns the complete object
  const isCartAdded = cartItems.findIndex((item) => {
    return item._id === id;
  });
  //console.log(isCartAdded); //if item/id is not in cart, it returns -1.but if its in cart, it returns a number greater than 0

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  //console.log(product);

  const slideLength = product?.image.length;
  const nextImage = () => {
    setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
  };
  let slideInterval;
  useEffect(() => {
    if (product?.image.length > 1) {
      const auto = () => {
        slideInterval = setInterval(nextImage, 2000);
      };
      auto();
      return () => {
        clearInterval(slideInterval);
      };
    }
  }, [imageIndex, slideInterval, product]);

  const averageRating = calculateAverageRatings(product?.ratings);

  const addToCart =  (product) => {
    dispatch(cartActions.ADD_TO_CART(product)); //this send the product and its properties to redux store.
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };
  const removeFromCart =  (product) => {
    dispatch(cartActions.DECREASE_CART(product));
     dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  return (
    <section>
      <div className={`container ${classes.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to={"/shop"}>&larr; Back to products</Link>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={classes.details}>
              <div className={classes.img}>
                <img
                  src={product?.image[imageIndex]}
                  alt={product?.name}
                  className={classes.pImg}
                />
                <div className={classes.smallImg}>
                  {product?.image.map((img, index) => {
                    return (
                      <img
                        key={index}
                        src={img}
                        alt="product image"
                        onClick={() => setImageIndex(index)}
                        className={imageIndex === index ? "activeImg" : ""}
                      />
                    );
                  })}
                </div>
              </div>
              <div className={classes.content}>
                <h3>{product?.name}</h3>
                <ProductRating
                  averageRating={averageRating}
                  noOfRatings={product?.ratings.length}
                />
                <div className="--underline"></div>
                <div className={classes.property}>
                  <p>
                    <b>Price:</b>
                  </p>
                  <p className={classes.price}>{`$${product?.price}`}</p>
                </div>
                <div className={classes.property}>
                  <p>
                    <b>SKU:</b>
                  </p>
                  <p>{product?.sku}</p>
                </div>
                <div className={classes.property}>
                  <p>
                    <b>Category:</b>
                  </p>
                  <p>{product?.category}</p>
                </div>
                <div className={classes.property}>
                  <p>
                    <b>Brand:</b>
                  </p>
                  <p>{product?.brand}</p>
                </div>
                <div className={classes.property}>
                  <p>
                    <b>Color:</b>
                  </p>
                  <p>{product?.color}</p>
                </div>
                <div className={classes.property}>
                  <p>
                    <b>Quantity in Stock:</b>
                  </p>
                  <p>{product?.quantity}</p>
                </div>
                <div className={classes.property}>
                  <p>
                    <b>Sold:</b>
                  </p>
                  <p>{product?.sold}</p>
                </div>

                <div className={classes.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => removeFromCart(product)}>
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}>
                        +
                      </button>
                    </>
                  )}
                </div>
                <div className="--flex-start">
                  {product?.quantity > 0 ? (
                    <button
                      className="--btn --btn-primary"
                      onClick={() => addToCart(product)}>
                      ADD TO CART
                    </button>
                  ) : (
                    <button
                      className="--btn --btn-danger"
                      onClick={() =>
                        toast.error("Sorry this product is outta stock")
                      }>
                      OUT OF STOCK
                    </button>
                  )}
                  <button className="--btn --btn-danger">
                    ADD TO WISHLIST
                  </button>
                </div>
                <div className="--underline"></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product?.description),
                  }}></div>
              </div>
            </div>
          </>
        )}
        <Card cardClass={classes.card}>
          <h3>Product Review???</h3>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
