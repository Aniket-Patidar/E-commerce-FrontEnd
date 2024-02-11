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


const basePath = process.env.NEXT_PUBLIC_REACT_APP_API_URL

export const createUser = (userInfo) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(
      `${basePath}/auth/signup`,
      { ...userInfo },
      {
        headers: { "content-type": "application/json" },
      }
    );
    console.log(data, "===");
    localStorage.setItem("token", data.token);
    dispatch(setUser(data.user));
  } catch (err) {
    console.log(err);
    dispatch(setError("please enter correct data"));
  }
};

export const loginUser = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `${basePath}/auth/login`,
      { ...data },
      {
        headers: { "content-type": "application/json" },
      }
    );
    localStorage.setItem("token", res.data.token);
    if (res.data.user.id) {
      dispatch(setLoginUser(res.data.user));
    } else {
      dispatch(setError(res.data.msg));
    }
  } catch (err) {
    console.log(err, "Error");
  }
};

export const getUserInfo = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${basePath}/auth/userInfo`, {
      headers: {
        authorization: `${localStorage.getItem("token")} `,
      },
    });
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
      `${basePath}/users`,
      { ...address },
      {
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(setUser(res.data));
  } catch (err) {
    console.log(err, "err ");
  }
};

export const removeAddress = (address) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(
      `${basePath}/users/removeAddress`,
      { ...address },
      {
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(setUser(res.data));
  } catch (err) {
    console.log(err, "err ");
  }
};

export const logoutAyc = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${basePath}/auth/logout`, {
      headers: {
        "content-type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    dispatch(setUser(""));
  } catch (err) {
    console.log(err, "err ");
  }
};

export const sendMail = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `${basePath}/auth/reset-password-request`,
      { ...data },
      {
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
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
      `${basePath}/auth/reset-password`,
      { ...data },
      {
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res, "resetpASS");
  } catch (err) {
    dispatch(setError("error"));
  }
};

export const uploadImage = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `${basePath}/users/image`,
       data ,
      {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res, "done");
  } catch (err) {
    console.log(err);
    dispatch(setError("error"));
  }
};

export const updateProfile = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      `${basePath}/users/ProfileUpdate`,
      { ...data },
      {
        headers: {
          "content-type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
    if (err?.response?.data?.codeName == "DuplicateKey") {
      dispatch(SetUserProfileError("with this Email user all ready exist"));
    }
    dispatch(setError("error"));
  }
};
