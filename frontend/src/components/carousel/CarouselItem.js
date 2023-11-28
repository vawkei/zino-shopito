import { Link } from "react-router-dom";
import "./Carousel.scss";
import { shortenText } from "../../utils";
import { cartActions, saveCartDB } from "../../store/cart/cartIndex";
import { useDispatch } from "react-redux";

const CarouselItem = (props) => {
    
    const dispatch = useDispatch();
  
    const removeHTMLTags = (description) => {
    const regex = /<[^>]+>/g;
    return description.replace(regex, "");
  };

  const addToCart = (product) => {
    dispatch(cartActions.ADD_TO_CART(product)); //this send the product and its properties to redux store.
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  return (
    <div className="carouselItem">
      <Link to={`/product-details/${props.product._id}`}>
        <img className="product--image" src={props.url} alt={props.url} />
        <p className="price">
          <span>
            {props.regularPrice > 0 && <del>${props.regularPrice}</del>}
          </span>
          {`$${props.price}`}
        </p>
        <h4>{props.name.slice(0, 15)}...</h4>
        <p className="--mb">
          {shortenText(removeHTMLTags(props.description), 20)}
        </p>
      </Link>
      <button
        className="--btn --btn-primary --btn-block"
        onClick={() => addToCart(props.product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default CarouselItem;

//THE ONE BELOW IS A DUMMY VERSION, BEFORE WE CONFIGURED AND ADDED THE REAL/ACTUAL DATA TP OUR MONGODB:

// import { Link } from "react-router-dom";
// import "./Carousel.scss";
// import { shortenText } from "../../utils";

// const CarouselItem = (props) => {
//     return (
//         <div className="carouselItem">
//             <Link to={"/product-details"}>
//                 <img className="product--image" src={props.url} alt={props.url} />
//                 <p className="price">{`$${props.price}`}</p>
//                 <h4>{props.name.slice(0,15)}...</h4>
//                 <p className="--mb">{shortenText(props.description,20)}</p>
//             </Link>
//             <button className="--btn --btn-primary --btn-block">Add to Cart</button>
//         </div>
//      );
// }

// export default CarouselItem;
