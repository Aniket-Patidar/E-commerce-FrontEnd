import axios from "axios";
const {
  setProduct,
  setCategories,
  setBrands,
  setProducts,
  setSingleProduct,
  setOrderProduct,
  setOrderStatusUpdate,
} = require("./AdminSclice");

/* need to fixed id */
export const getAllProducts = (data) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/products?user=` + 1
    );
    dispatch(setProduct(data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const getFilterProduct =
  (filter, sort, pagination) => async (dispatch, getState) => {
    let queryStr = "";
    for (let key in filter) {
      const categoryValue = filter[key];
      if (categoryValue.length >= 0) {
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

    try {
      /* TODO : need to fixed the id */
      var id = 1;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/products?user=` +
          id +
          "&" +
          queryStr
      );

      const totalItems = await res.headers.get("X-Total-Count");
      dispatch(setProducts({ data: { allProducts: res.data, totalItems } }));
    } catch (err) {
      console.log(err, "Error");
    }
  };

// setCategories
export const getAllCategories = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/categories`
    );
    dispatch(setCategories(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};

// getAllBrands
export const getAllBrands = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/brands`
    );
    dispatch(setBrands(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const getSelectedProduct = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/products/` + id
    );

    dispatch(setProduct(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/products/` + id
    );

    console.log(data);
  } catch (err) {
    console.log(err, "Error");
  }
};

export const createProduct = (data) => async (dispatch, getState) => {
  try {
    const product = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/products`,
      { ...data },
      {
        headers: { "content-type": "application/json" },
      }
    );
    alert("product created");
    console.log(product.data, "new");
  } catch (err) {
    alert("product created Error");

    console.log(err, "Error");
  }
};

export const getSingleProduct = (productId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/products/` + productId
    );
    dispatch(setSingleProduct(data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const updateProduct = (productDetails) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/products/` +
        productDetails.id,
      { ...productDetails },
      {
        headers: { "content-type": "application/json" },
      }
    );
    console.log(data);
  } catch (err) {
    console.log(err, "Error");
  }
};

/*get all order to admin  */
export const getAllOrder =
  (filter, sort, pagination) => async (dispatch, getState) => {
    let queryStr = "";

    for (let key in filter) {
      const categoryValue = filter[key];
      if (categoryValue.length > 0) {
        const lastCategoryValue = categoryValue[categoryValue.length - 1];
        queryStr += `${key}=${lastCategoryValue}&`;
      }
    }

    for (let key in pagination) {
      queryStr += `${key}=${pagination[key]}&`;
    }

    for (let key in sort) {
      queryStr += `${key}=${sort[key]}&`;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/admin?` + queryStr
      );
      const totalItems = await res.headers.get("X-Total-Count");
      dispatch(setOrderProduct({ data: res.data, totalItems: totalItems }));
    } catch (err) {
      console.log(err, "Error");
    }
  };

export const EditOrder = (id, status) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/admin/` + id,
      { status: status },
      {
        headers: { "content-type": "application/json" },
      }
    );
    dispatch(setOrderStatusUpdate(data));
  } catch (err) {
    console.log(err, "Error");
  }
};
