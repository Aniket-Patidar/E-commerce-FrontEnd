import axios from "axios";

const {
  setUser,
  setLoginUser,
  setError,
  setUserInfo,
  setIscheckUser,
  setSendEmil,
  SetUserProfileError,
} = require("./userSclice");

export const createUser = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/auth/signup",
      { ...data },
      {
        headers: { "content-type": "application/json" },
      }
    );

    console.log(res.data);
    if (res.data.success) {
      dispatch(setUser(res.data.user));
    } else {
      dispatch(setError(res.data.msg));
    }
    // cheack user data type
  } catch (err) {
    dispatch(setError("please enter correct data"));
  }
};

export const loginUser = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/auth/login",
      { ...data },
      {
        headers: { "content-type": "application/json" },
      }
    );
    console.log(res, "res");
    if (res.data.user.id) {
      dispatch(setLoginUser(res.data.user));
    } else {
      dispatch(setError(res.data.msg));
    }
  } catch (err) {
    console.log(err, "Error");
  }
};

// check user is logging or not
export const getUserInfo = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:8080/auth/userInfo");
    if (res.data.user.id) {
      dispatch(setUserInfo(res.data.user));
    } else {
      dispatch(setError(res.data.msg));
    }
    dispatch(setIscheckUser());
  } catch (err) {
    dispatch(setIscheckUser());
    console.log(err, "Error");
  }
};

export const userAddressUpdate = (address) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(
      "http://localhost:8080/users",
      { ...address },
      { headers: { "content-type": "application/json" } }
    );
    dispatch(setUser(res.data));
  } catch (err) {
    console.log(err, "err ");
  }
};

export const removeAddress = (address) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(
      "http://localhost:8080/users/removeAddress",
      { ...address },
      { headers: { "content-type": "application/json" } }
    );
    dispatch(setUser(res.data));
  } catch (err) {
    console.log(err, "err ");
  }
};

export const logoutAyc = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("http://localhost:8080/auth/logout");
    console.log(res, "logout");
    // dispatch(setUser());
  } catch (err) {
    console.log(err, "err ");
  }
};

/* forget Password */
export const sendMail = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/auth/reset-password-request",
      { ...data },
      {
        headers: { "content-type": "application/json" },
      }
    );
    dispatch(setSendEmil(true));
  } catch (err) {
    console.log(err, "emil");
    dispatch(setError("error"));
  }
};

export const resetPassword = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/auth/reset-password",
      { ...data },
      {
        headers: { "content-type": "application/json" },
      }
    );
    console.log(res, "resetpASS");
  } catch (err) {
    dispatch(setError("error"));
  }
};

export const uploadImage = (data) => async (dispatch, getState) => {
  console.log(data, "data");
  try {
    const res = await axios.post(
      "http://localhost:8080/users/image",
      { data },
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    console.log(res, "done");
  } catch (err) {
    console.log(err);
    dispatch(setError("error"));
  }
};

/* update Profile */

export const updateProfile = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/users/ProfileUpdate",
      { ...data }
      // {
      //   headers: { "content-type": "application/json" },
      // }
    );
    // console.log(res, "done");
  } catch (err) {
    console.log(err);
    if (err?.response?.data?.codeName == "DuplicateKey") {
      dispatch(SetUserProfileError("with this Email user all ready exist"));
    }
    dispatch(setError("error"));
  }
};
