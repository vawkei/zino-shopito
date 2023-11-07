import { useState } from "react";
import Card from "../../ui/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createcategory } from "../../../store";
import Loader from "../../loader/Loader";

const CreateCategory = (props) => {
  const [name, setName] = useState("");

  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const saveCategory =async (e) => {
    e.preventDefault();
    
    if(name.length <3){
      return toast.error("name must be up to 3 characters")
    }
    
    const formData = {name}
    await dispatch(createcategory(formData))
    props.reloadCategory()
    setName("")
    //console.log(name);
  };

  return (
    <>
    {isLoading && <Loader />}
      <div className="--mb2">
        <h3>Create Category</h3>
        <p>
          Use this form to <b>Create a Category</b>
        </p>
        <Card className="card">
          <br />
          <form onSubmit={saveCategory}>
            <label htmlFor="">Category Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Category
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateCategory;
