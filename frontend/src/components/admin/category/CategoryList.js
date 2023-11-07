import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../../../store";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { FaTrashAlt } from "react-icons/fa";

const CategoryList = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const confirmDelete =  (slug) => {
    confirmAlert({
      title: "Delete Category",
      message: "Are you sure to delete this category?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteCat(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const deleteCat = async (slug) => {
    await dispatch(deleteCategory(slug));
    await dispatch(getCategories());
  };

  return (
    <div className="--mb2">
      <h2>All Categories</h2>
      <div className="table">
        {categories.length === 0 ? (
          <p>No category found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => {
                return (
                  <tr key={cat._id}>
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color="red"
                          onClick={()=>confirmDelete(cat.slug)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
