import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [],
// };

export const ProductSclice = createSlice({
  name: "ProductSclice",
  initialState: {
    products: [],
    totalItems: 0,
    categories: [],
    brands: [],
    searchText: "",
    product: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.data.allProducts;
      state.totalItems = action.payload.data.totalItems;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setSearchText: (state, action) => {
      console.log(setSearchText);
      state.searchText = action.payload;
    },
  },
});

export const {
  setProducts,
  setCategories,
  setBrands,
  setProduct,
  setSearchText,
} = ProductSclice.actions;
export default ProductSclice.reducer;
