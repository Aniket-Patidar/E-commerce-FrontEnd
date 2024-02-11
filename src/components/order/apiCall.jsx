import axios from "axios";

const { setOrder, setAllOrder } = require("./orderSclice");

const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
export const AycSetOrder = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `${baseUrl}/orders`,
      { ...data },
      {
        headers: {
          authorization: `${localStorage.getItem("token")} `,
          headers: { "content-type": "application/json" },
        },
      }
    );
    dispatch(setOrder(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const AycGetAllOrder = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${baseUrl}/orders`, {
      headers: {
        authorization: `${localStorage.getItem("token")} `,
        headers: { "content-type": "application/json" },
      },
    });
    dispatch(setAllOrder(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};
