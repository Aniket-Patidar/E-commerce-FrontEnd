import axios from "axios";
import { setAllCard, setMyCard, setRemoveItems } from "./cardSclice";

export const createAddTOCard = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post("http://localhost:8080/cart", data, {
      headers: { "content-type": "application/json" },
    });
    dispatch(setMyCard(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const getUserAllCard = (userId) => async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:8080/cart");
    dispatch(setAllCard(res.data));
  } catch (err) {
    console.log(err, "Error");
  }
};

export const removeItem = (itemId) => async (dispatch, getState) => {
  try {
    const res = await axios.delete("http://localhost:8080/cart/" + itemId);
    dispatch(setRemoveItems(itemId));
  } catch (err) {
    console.log(err.response.data);
  }
};

export const updateItem = (data, item) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(
      "http://localhost:8080/cart/" + item.id,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
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
      "http://localhost:8080/cart/all/:" + userId
    );
  } catch (err) {
    console.log(err, "delete all  card");
  }
};
