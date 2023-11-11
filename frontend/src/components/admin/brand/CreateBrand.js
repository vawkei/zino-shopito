import { useEffect, useState } from "react";
import Card from "../../ui/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import { createBrand, getCategories } from "../../../store";

const CreateBrand = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const saveBrand = async (e) => {
    e.preventDefault();
        
    if(name.length <2){
      return toast.error("name must be up to 3 characters")
    };
    if(!category){
      return toast.error("please add a parent category")
    };
    
    const formData = {name,category}
    
    await dispatch(createBrand(formData))
    props.reloadBrand()
    setName("");
    
    
    //console.log(name);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="--mb2">
        <h3>Create Brand</h3>
        <p>
          Use this form to <b>Create a Brand</b>
        </p>
        <Card className="card">
          <br />
          <form onSubmit={saveBrand}>
            <label htmlFor="">Brand Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="">Parent Category:</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}>
              <option>select category</option>
              {categories.length > 0 &&
                categories.map((cat) => {
                  return (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  );
                })}
            </select>
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Brand
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateBrand;
