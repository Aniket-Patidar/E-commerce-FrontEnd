import { createSlice } from "@reduxjs/toolkit";
/* admin */
export const adminProductSclice = createSlice({
  name: "adminProductSclice",
  initialState: {
    products: [],
    totalItems: 0,
    categories: [],
    brands: [],
    product: [],
    productById: {},
    OrderProduct: [],
    totalItems: 0,
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
    setRemoveProduct: (state, action) => {
      const index = state.product.findIndex(
        ({ id }) => id == action.payload.id
      );
      state.product.splice(index, 1);
    },
    setSingleProduct: (state, action) => {
      state.productById = action.payload;
    },
    setOrderProduct: (state, action) => {
      state.OrderProduct = action.payload.data;
      state.totalItems = action.payload.totalItems;
    },
    setOrderStatusUpdate: (state, action) => {
      const data = action.payload;
      const index = state.OrderProduct.findIndex((e) => e.id == data.id);
      state.OrderProduct.splice(index, 1, data);
    },
  },
});

export const {
  setProducts,
  setCategories,
  setBrands,
  setProduct,
  setSingleProduct,
  setOrderProduct,
  setOrderStatusUpdate,
} = adminProductSclice.actions;
export default adminProductSclice.reducer;
