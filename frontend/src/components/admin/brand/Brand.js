import { useDispatch } from "react-redux";
import "./Brand.scss";
import BrandList from "./BrandList";
import CreateBrand from "./CreateBrand";
import { getBrands } from "../../../store";

const Brand = () => {
  
  const dispatch = useDispatch()

  const reloadBrand =()=>{
    dispatch(getBrands());
}
  
  return (
    <section>
      <div className="container coupon">
        <CreateBrand reloadBrand={reloadBrand} />
        <BrandList />
      </div>
    </section>
  );
};

export default Brand;
