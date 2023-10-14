// import "./Carousel.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./Data";

const ProductCarousel = (props) => {
  return (
    <div>
      <Carousel
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={300}
        customTransition="all 500ms ease"
        transitionDuration={1000}>
        
        
        {props.products}
      
      
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
