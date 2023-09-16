import { createSlice } from "@reduxjs/toolkit";
export const orderSclice = createSlice({
  name: "orderSclice",
  initialState: {
    orders: [],
    currentOrder: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
    },
    setAllOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrder,setAllOrder } = orderSclice.actions;
export default orderSclice.reducer;
