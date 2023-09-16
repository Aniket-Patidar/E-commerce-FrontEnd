import { createSlice } from "@reduxjs/toolkit";

export const cardSclice = createSlice({
  name: "cardSclice",
  initialState: {
    myCard: [],
    AllCard: [],
  },
  reducers: {
    setMyCard: (state, action) => {
      state.myCard.push(action.payload);
    },
    setAllCard: (state, action) => {
      state.AllCard = action.payload;
    },
    setRemoveItems: (state, action) => {
      const index = state.AllCard.findIndex((e) => e.id == action.payload);
      state.AllCard.splice(index, 1);
    },
  },
});

export const { setMyCard, setAllCard, setRemoveItems } = cardSclice.actions;
export default cardSclice.reducer;
