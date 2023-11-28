import { Link } from "react-router-dom";
import Card from "../../ui/card/Card";
import classes from "./ProductItem.module.scss";
import { calculateAverageRatings, shortenText } from "../../../utils";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import ProductRating from "../productRating/ProductRating";
import { useDispatch } from "react-redux";
import { cartActions, saveCartDB } from "../../../store/cart/cartIndex";

const ProductItem = (props) => {
  const averageRating = calculateAverageRatings(props.ratings);
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(cartActions.ADD_TO_CART(product)); //this send the product and its properties to redux store.
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  return (
    <Card cardClass={props.grid ? `${classes.grid}` : `${classes.list}`}>
      <Link to={`/product-details/${props._id}`}>
        <div className={classes.img}>
          <img src={props.image[0]} alt={props.name} />
        </div>
      </Link>
      <div className={classes.content}>
        <div className={classes.details}>
          <p>
            <span>
              {props.regularPrice > 0 && <del>$ {props.regularPrice}</del>}
            </span>
            {` $${props.price}`}
          </p>
          <ProductRating
            averageRating={averageRating}
            noOfRatings={props.ratings.length}
          />
          <h4>{shortenText(props.name, 18)}</h4>

          {!props.grid && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortenText(props.description, 200)),
              }}></div>
          )}
          {props.quantity > 0 ? (
            <button
              className="--btn --btn-primary"
              onClick={() => addToCart(props.product)}>
              Add To Cart
            </button>
          ) : (
            <button
              className="--btn --btn-red"
              onClick={() => toast.error("Sorry product is out of stock")}>
              Out Of Stock
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
