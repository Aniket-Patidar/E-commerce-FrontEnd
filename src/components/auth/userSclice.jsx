import { createSlice } from "@reduxjs/toolkit";
export const UserSclice = createSlice({
  name: "userSclice",
  initialState: {
    LoginUser: null,
    user: null,
    UserError: null,
    error: null,
    ischeckUser: false,
    EmailSend: false,
    userProfileError:null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoginUser: (state, action) => {
      state.LoginUser = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    setIscheckUser: (state, action) => {
      state.ischeckUser = true;
    },
    setLogOut: (state, action) => {
      state.user = null;
    },
    setSendEmil: (state, action) => {
      state.EmailSend = true;
    },
    
    SetUserProfileError: (state, action) => {
      state.userProfileError = action.payload;
    },
  },
});

export const {
  setUser,
  setLoginUser,
  setLogOut,
  setError,
  setUserInfo,
  setIscheckUser,
  setSendEmil,
  SetUserProfileError
} = UserSclice.actions;
export default UserSclice.reducer;
