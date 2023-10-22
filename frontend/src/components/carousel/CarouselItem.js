import { Link } from "react-router-dom";
import "./Carousel.scss";
import { shortenText } from "../../utils";

const CarouselItem = (props) => {
    return ( 
        <div className="carouselItem">
            <Link to={"/product-details"}>
                <img className="product--image" src={props.url} alt={props.url} />
                <p className="price">{`$${props.price}`}</p>
                <h4>{props.name.slice(0,15)}...</h4>
                <p className="--mb">{shortenText(props.description,20)}</p>
            </Link>
            <button className="--btn --btn-primary --btn-block">Add to Cart</button>
        </div>
     );
}
 
export default CarouselItem;