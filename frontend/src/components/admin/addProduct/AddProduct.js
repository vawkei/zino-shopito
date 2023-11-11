import "./AddProduct.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import { createProduct } from "../../../store/products/productIndex";
import { useNavigate } from "react-router-dom";
import { productActions } from "../../../store/products/productIndex";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  price: "",
  color: "",
  regularPrice: "",
};

const AddProduct = () => {

  
  const [product, setProduct] = useState(initialState);
  const { name, category, brand, quantity, price, color, regularPrice } =
    product;
  const [description,setDescription] = useState("");
  const [files,setFiles] = useState([]);
  const { isLoading,message } = useSelector((state) => state.product);

  const  brands  = useSelector((state) => state.brand.brands);
  //console.log(brands);

  const  categories  = useSelector((state) => state.category.categories);
  //console.log(categories);

  const [filteredBrands, setFilteredBrands] = useState([]);


  const dispatch = useDispatch();
  const navigate = useNavigate();

    const generateSku = (category)=>{
     const letter =  category.slice(0,3).toUpperCase();
     const number = Date.now();
     const sku = `${letter}-${number}`;
     return sku
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        
        if(files.length < 1){
          toast.error("Please upload image")
          return
        };

        const formData = {
          name,
          sku:generateSku(category),
          category,
          brand,
          color,
          quantity:Number(quantity),
          regularPrice,
          price,
          description,
          image:files
        };
        //console.log(formData)
        // console.log(product);
        // console.log(description);
        await dispatch(createProduct(formData));
        
    };

    useEffect(()=>{
      if(message==="Product created successfully"){
        navigate("/admin/all-products");
      }
      dispatch(productActions.RESET_PRODUCT())
    },[dispatch,message,navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //filter brands based on selected category: for example if the user selects laptop look for brands that have a category called laptop;
  const filterBrands = (selectedCategory)=>{
    const newBrands = brands.filter((brand)=>{
      return brand.category === selectedCategory
    })
    setFilteredBrands(newBrands)
  };

  useEffect(()=>{
    filterBrands(category)
  },[category]);


  return (
    <section>
      <div className="container">
        {isLoading && <Loader />}
        <h3 className="--mt">Add New Product</h3>
        <ProductForm
          saveProduct={saveProduct}
          product={product}
          categories={categories}
          handleInputChange={handleInputChange}
          filteredBrands={filteredBrands}
          description={description}
          setDescription={setDescription}
          files={files}
          setFiles={setFiles}
          isEditing={false}
        />
      </div>
    </section>
  );
};

export default AddProduct;
