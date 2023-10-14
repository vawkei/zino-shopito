import { Link } from "react-router-dom";
import "./Carousel.scss";

const CarouselItem = (props) => {
    return ( 
        <div className="carouselItem">
            <Link to={"/product-details"}>
                <img className="product--image" src={props.url} alt={props.url} />
                <p className="price">{`$${props.price}`}</p>
                <h4>{props.name}</h4>
                <p className="--mb">{props.description.slice(0,30)}...</p>
            </Link>
            <button className="--btn--btn-primary">Add to Cart</button>
        </div>
     );
}
 
export default CarouselItem;