import { createSlice } from "@reduxjs/toolkit";

export const adminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState: {
    products: [],
    totalItems: 0,
    categories: [],
    brands: [],
    product: null, // Changed from array to single object
    productById: {},
    orderProducts: [],
    orderTotalItems: 0, // Changed variable name for clarity
    loading: false, // Added loading state
    error: null, // Added error state
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.data.allProducts;
      state.totalItems = action.payload.data.totalItems;
      state.loading = false;
      state.error = null;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload; // Assuming payload is a single product object
      state.loading = false;
      state.error = null;
    },
    removeProduct: (state, action) => {
      const productId = action.payload.id;
      state.products = state.products.filter(product => product.id !== productId);
      state.totalItems--; // Decrement totalItems after removing a product
      state.loading = false;
      state.error = null;
    },
    setProductById: (state, action) => {
      state.productById[action.payload.id] = action.payload;
      state.loading = false;
      state.error = null;
    },
    setOrderProducts: (state, action) => {
      state.orderProducts = action.payload.data;
      state.orderTotalItems = action.payload.totalItems;
      state.loading = false;
      state.error = null;
    },
    updateOrderStatus: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.orderProducts.findIndex(order => order.id === updatedOrder.id);
      state.orderProducts[index] = updatedOrder;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  setCategories,
  setBrands,
  setProduct,
  removeProduct,
  setProductById,
  setOrderProducts,
  updateOrderStatus,
  setLoading,
  setError,
} = adminProductSlice.actions;

export default adminProductSlice.reducer;
