import axios from "axios";
const {
  setProduct,
  setCategories,
  setBrands,
  setProducts,
} = require("./ProductSclice");

export const getAllProducts = (data) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("http://localhost:8080/products");
    dispatch(setProduct(data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const getFilterProduct =
  (filter, sort, pagination, searchText) => async (dispatch, getState) => {
    let queryStr = "";
    for (let key in filter) {
      const categoryValue = filter[key];
      if (categoryValue.length > 0) {
        const lastCategoryValue = categoryValue[categoryValue.length - 1];
        queryStr += `${key}=${lastCategoryValue}&`;
      }
    }
    for (let key in sort) {
      queryStr += `${key}=${sort[key]}&`;
    }
    for (let key in pagination) {
      queryStr += `${key}=${pagination[key]}&`;
    }

    if (searchText) {
      queryStr += `search=${searchText}&`;
    }

    try {
      const res = await axios.get("http://localhost:8080/products?" + queryStr);
      const totalItems = await res.headers.get("X-Total-Count");
      dispatch(setProducts({ data: { allProducts: res.data, totalItems } }));
    } catch (err) {
      console.log(err, "Error");
    }
  };

// setCategories
export const getAllCategories = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:8080/categories");
    dispatch(setCategories(res.data.msg));
  } catch (err) {
    console.log(err, "Error");
  }
};

// getAllBrands
export const getAllBrands = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:8080/brands");
    dispatch(setBrands(res.data.msg));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const getSelectedProduct = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:8080/products/" + id);

    dispatch(setProduct(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};
