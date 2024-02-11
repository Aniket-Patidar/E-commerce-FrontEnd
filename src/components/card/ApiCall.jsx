import axios from "axios";
import { setAllCard, setMyCard, setRemoveItems } from "./cardSclice";

const basePath = process.env.NEXT_PUBLIC_REACT_APP_API_URL


export const createAddTOCard = (data) => async (dispatch, getState) => {

  try {
    const res = await axios.post(`${basePath}/cart`, data, {
      headers: {
        authorization: `${localStorage.getItem("token")} `,
        headers: { "content-type": "application/json" },
      },
    });
    dispatch(setMyCard(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const getUserAllCard = (userId) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${basePath}/cart`, {
      headers: {
        "content-type": "application/json",
        authorization: `${localStorage.getItem("token")} `,
      },
    });
    dispatch(setAllCard(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const removeItem = (itemId) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(`${basePath}/cart/` + itemId,{
      headers: {
        "content-type": "application/json",
        authorization: `${localStorage.getItem("token")} `,
      },
    });
    dispatch(setRemoveItems(itemId));
  } catch (err) {
    console.log(err.response.data);
  }
};

export const updateItem = (data, item) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(
      `${basePath}/cart/` + item.id,
      { ...data },
      {
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")} `,
        },
      }
    );
  } catch (err) {
    console.log(err, "Error");
  }
};

/*remove all card of logging user because order is placed  */
export const removeAllCard = (userId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.delete(
      `${basePath}/cart/all/:` + userId,
      {
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")} `,
        },
      }
    );
  } catch (err) {
    console.log(err, "delete all  card");
  }
};
