import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTkxYTY1ZjNiMTM5NmYxY2JlMzlmNCIsImlhdCI6MTcyNjU1MjY3N30.MjfZNgbzNmGwngQG_W_jrN9EAVpn9NraiJQgIw8o2qY
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = dataSlice.actions;
export default dataSlice.reducer;
