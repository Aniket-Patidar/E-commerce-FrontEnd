import axios from "axios";

const { setOrder, setAllOrder } = require("./orderSclice");
export const AycSetOrder = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/orders",
      { ...data },
      {
        headers: { "content-type": "application/json" },
      }
    );
    dispatch(setOrder(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const AycGetAllOrder = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:8080/orders");
    dispatch(setAllOrder(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};
