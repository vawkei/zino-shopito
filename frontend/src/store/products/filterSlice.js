import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products?.filter((product) => {
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        );
      });
      state.filteredProducts=tempProducts;
    },
    SORT_PRODUCTS(state,action){
        const {products,sort} = action.payload;
        let tempProducts = [];

        if(sort==="latest"){
            tempProducts=products
        };
        if(sort==="lowest-price"){
             tempProducts = products.slice().sort((a,b)=>{
                return a.price-b.price
            })   
        };
        if(sort ==="highest-price"){
            tempProducts = products.slice().sort((a,b)=>{
                return b.price - a.price
            })
        };
        if(sort ==="a-z"){
            tempProducts = products.slice().sort((a,b)=>{
                return a.name.localeCompare(b.name)
            })
        };
        if(sort === "z-a"){
            tempProducts= products.slice().sort((a,b)=>{
                return b.name.localeCompare(a.name)
            })
        }
        state.filteredProducts = tempProducts
    },
    FILTER_BY_CATEGORY(state,action){
      const {products,category} = action.payload;

      let tempProducts = [];

      if(category === "All"){
        tempProducts = products
      }else{
        tempProducts = products?.filter((product)=>{
          return product.category === category
        })
      }
      state.filteredProducts = tempProducts
    },
    FILTER_BY_BRAND(state,action){
      const {products,brand} = action.payload;
      let tempProducts=[];
      if(brand==="All"){
        tempProducts =products
      }else{
        tempProducts = products.filter((product)=>{
          return product.brand === brand
        })
      }
      state.filteredProducts = tempProducts
    },
    //this is for the SLIDER COMPONENET
    // FILTER_BY_PRICE(state,action){
    //   const {products,price} = action.payload;
    //   let tempProducts = [];
    //    tempProducts = products.filter((product)=>{
    //     return product.price >= price[0] && product.price <= price[1]
    //   })
    //   state.filteredProducts = tempProducts;
    // }
    FILTER_BY_PRICE(state,action){
      const {products,price} = action.payload;
      let tempProducts = [];
       tempProducts = products.filter((product)=>{
        return product.price <= price 
      })
      state.filteredProducts = tempProducts;
    }
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice;
