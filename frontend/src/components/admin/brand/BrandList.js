import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deleteBrand, getBrands } from "../../../store";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { FaTrashAlt } from "react-icons/fa";



const BrandList = () => {
    
  const  brands  = useSelector((state) => state.brand.brands);
    console.log(brands)
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());    
  }, [dispatch]);


  const confirmDelete =  (slug) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure to delete this brand?",
      buttons: [
        {
          label: "Delete",
          onClick: () => RemoveBrand(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const RemoveBrand = async (slug) => {
    await dispatch(deleteBrand(slug));
    await dispatch(getBrands())
  };

  return (
    <div className="--mb2">
      <h2>All Brands</h2>
      <div className="table">
        {brands.length === 0 ? (
          <p>No brand found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 && brands.map((brand, index) => {
                return (
                  <tr key={brand._id}>
                    <td>{index + 1}</td>
                    <td>{brand.name}</td>
                    <td>{brand.category}</td>
                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color="red" onClick={()=>confirmDelete(brand.slug)}/>
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

}
 
export default BrandList;