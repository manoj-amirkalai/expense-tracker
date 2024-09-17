
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem("token") || "" : "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setToken(state, action) {
      console.log(action.payload);
      
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
  },
});

export const { setToken } = dataSlice.actions;
export default dataSlice.reducer;
