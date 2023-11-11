import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { useEffect, useState } from "react";
import {
  getSingleProduct,
  updateProduct,
} from "../../../store/products/productIndex";
import { getBrands, getCategories } from "../../../store";
import { toast } from "react-toastify";
import { productActions } from "../../../store/products/productIndex";
import ProductForm from "../productForm/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch(); 
  
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);


  const productEdit = useSelector((state) => state.product.product);
  console.log(productEdit);

  const { isLoading, message } = useSelector((state) => state.product);

  const [product, setProduct] = useState(productEdit);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  const brands = useSelector((state) => state.brand.brands);
  //console.log(brands);

  const categories = useSelector((state) => state.category.categories);
  //console.log(categories);


  useEffect(() => {
    setProduct(productEdit);
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
    if (productEdit && productEdit.image) {
      setFiles(productEdit.image);
    }
  }, [productEdit]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  const filterBrands = (selectedCategory) => {
    const newBrands = brands.filter((brand) => {
      return brand.category === selectedCategory;
    });
    setFilteredBrands(newBrands);
  };

  useEffect(() => {
    filterBrands(product?.category);
  }, [product?.category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (files.length < 1) {
      toast.error("Please upload image");
      return;
    }

    const formData = {
      name: product.name,
      category: product.category,
      brand: product.brand,
      color: product.color,
      quantity: Number(product.quantity),
      regularPrice: product.regularPrice,
      price: product.price,
      description: product.description,
      image: files,
    };
    //console.log(formData)
    // console.log(product);
    // console.log(description);
    await dispatch(updateProduct({ id, formData }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (message === "Product updated successfully") {
      navigate("/admin/all-products");
    }
    dispatch(productActions.RESET_PRODUCT());
  }, [dispatch, message, navigate]);

  return (
    <section>
      <div className="container">
        {isLoading && <Loader />}
        <h3 className="--mt">Edit Product</h3>
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
          isEditing={true}
        />
      </div>
    </section>
  );
};

export default EditProduct;
