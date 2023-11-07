import { useDispatch } from "react-redux";
import  "./Category.scss"
import CategoryList from "./CategoryList";
import CreateCategory from "./CreateCategory";
import { getCategories } from "../../../store";


const Category = () => {
    
    const dispatch = useDispatch()

    const reloadCategory =()=>{
        dispatch(getCategories());
    }

    return ( 
        <section>
            <div className="container coupon">
            <CreateCategory reloadCategory={reloadCategory} />
            <CategoryList />
                
            </div>
        </section>
     );
}
 
export default Category;