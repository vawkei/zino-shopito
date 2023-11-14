import classes from "./ProductRating.module.scss";
import StarRatings from "react-star-ratings";

const ProductRating = ({ averageRating, noOfRatings }) => {
  return (
    <div>
      {averageRating > 0 && (
        <>
          <StarRatings
            starDimension="20px"
            starSpacing="2px"
            rating={averageRating}
            editing={false}
            starRatedColor="#F6B01E"
          />
          {{ noOfRatings }}
        </>
      )}
    </div>
  );
};

export default ProductRating;
