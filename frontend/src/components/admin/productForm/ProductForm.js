import { useEffect } from "react";
import Card from "../../ui/card/Card";
import "./ProductForm.scss";
import { useDispatch } from "react-redux";
import { getBrands, getCategories } from "../../../store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";

const ProductForm = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);


  const removeImage =(image)=>{
    props.setFiles(props.files.filter((img)=>{
     return  img !== image
    }))
  }

  return (
    <div className="add-product">
      <UploadWidget files={props.files} setFiles={props.setFiles} />
      <Card className="card">
        <br />
        <form onSubmit={props.saveProduct}>
          <label htmlFor="">Product Images:</label>
          <div className="slide-container">
            <aside>
              {props.files.length > 0  && props.files.map((image)=>{
                return(
                  <div className="thumbnail" key={image}>
                    <img  src={image} alt="product image" height={100}/>
                    <div>
                      <BsTrash size={25} className="thumbnailIcon" onClick={()=>removeImage(image)}/>
                    </div>
                  </div>
                )
              })}
              {props.files.length < 1  && (
                <p className="--m">No image set for this product</p>
              )}
            </aside>
          </div>
          <label htmlFor="">Product Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={props.product?.name}
            onChange={props.handleInputChange}
            required
          />
          <label htmlFor="">Product Category:</label>
          <select
            name="category"
            value={props.product?.category}
            onChange={props.handleInputChange}>
            {props.isEditing ? (
              <option value={props.product?.category}>
                {props.product?.category}
              </option>
            ) : (
              <option>Select category</option>
            )}
            {props.categories.length > 0 &&
              props.categories.map((cat) => {
                return (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
          </select>
          <label htmlFor="">Product Brand:</label>
          <select
            name="brand"
            value={props.product?.brand}
            onChange={props.handleInputChange}>
            {props.isEditing ? (
              <option value={props.product?.brand}>
                {props.product?.brand}
              </option>
            ) : (
              <option>Select brand</option>
            )}
            {props.filteredBrands.length > 0 &&
              props.filteredBrands.map((brand) => {
                return (
                  <option key={brand._id} value={brand.name}>
                    {brand.name}
                  </option>
                );
              })}
          </select>
          <label htmlFor="">Product Color:</label>
          <input
            type="text"
            placeholder="Color"
            name="color"
            value={props.product?.color}
            onChange={props.handleInputChange}
          />
          <label htmlFor="">Regular Price:</label>
          <input
            type="number"
            placeholder="Regular price"
            name="regularPrice"
            value={props.product?.regularPrice}
            onChange={props.handleInputChange}
          />
          <label htmlFor="">Price:</label>
          <input
            type="number"
            placeholder="Product price"
            name="price"
            value={props.product?.price}
            onChange={props.handleInputChange}
          />
          <label htmlFor="">Product Quantity:</label>
          <input
            type="number"
            placeholder="Product quantity"
            name="quantity"
            value={props.product?.quantity}
            onChange={props.handleInputChange}
          />
          <label htmlFor="">Product Description:</label>
          <ReactQuill
            theme="snow"
            value={props.description}
            onChange={props.setDescription}
            formats={ProductForm.formats}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// function insertStar() {
//   const cursorPosition = this.quill.getSelection().index;
//   this.quill.insertText(cursorPosition, "★");
//   this.quill.setSelection(cursorPosition + 1);
// }

// ProductForm.modules = {
//   toolbar: {
//     container: "#toolbar",
//     handlers: {
//       insertStar: insertStar
//     }
//   },
//   clipboard: {
//     matchVisual: false,
//   }
// };

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align"
]

export default ProductForm;
