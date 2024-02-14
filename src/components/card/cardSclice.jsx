import { createSlice } from "@reduxjs/toolkit";

export const cardSclice = createSlice({
  name: "cardSclice",
  initialState: {
    myCard: [],
    allCard: [],
    loadingCard: false,
    error: null, 
  },
  reducers: {
    setMyCard: (state, action) => {
      state.myCard.push(action.payload);
    },
    setAllCard: (state, action) => {
      state.allCard = action.payload;
    },
    setRemoveItems: (state, action) => {
      const index = state.allCard.findIndex((e) => e.id === action.payload);
      state.allCard.splice(index, 1);
    },
    setLoadingCard: (state, action) => {
      state.loadingCard = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMyCard,
  setAllCard,
  setRemoveItems,
  setLoadingCard,
  setError,
} = cardSclice.actions;
export default cardSclice.reducer;
