import axios from "axios";
const {
  setProduct,
  setCategories,
  setBrands,
  setProducts,
  setSingleProduct,
  setOrderProduct,
  setOrderStatusUpdate,
  setError,
  setLoading
} = require("./AdminSclice");

/* need to fixed id */
export const getAllProducts = () => async (dispatch, getState) => {
  dispatch(setLoading()); // Set loading state to true
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/products?user=1`,
      {
        headers: {
          authorization: `${localStorage.getItem("token")} `,
          "content-type": "application/json",
        },
      }
    );
    dispatch(setProduct(data));
  } catch (err) {
    dispatch(setError(err.message));
  }
};


export const getFilterProduct = (filter, sort, pagination, searchText) => async (dispatch, getState) => {
  let queryStr = "";


  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      categoryValues.forEach((value) => {
        queryStr += `${key}=${value}&`;
      });
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
    const res = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/products?` + queryStr);
    const totalItems = await res.headers.get("X-Total-Count");
    dispatch(setProducts({ data: { allProducts: res.data, totalItems } }));
  } catch (err) {
    console.error("Error fetching filtered products:", err);
    dispatch(setError(err.message || "Failed to fetch filtered products"));
  }
};

// setCategories
export const getAllCategories = () => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/categories`,
      {
        headers: {
          authorization: `${localStorage.getItem("token")} `,
          "content-type": "application/json",
        },
      }
    );
    dispatch(setCategories(data.msg));
  } catch (err) {
    dispatch(setError(err.message));
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
