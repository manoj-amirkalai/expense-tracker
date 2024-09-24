import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const localtoken =
  typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
const getProfile = async (localtoken) => {
  try {
    const response = await fetch("https://budget-tracker-manoj.onrender.com/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localtoken}`,
      },
    });
    const profiledata = await response.json();

    return profiledata.message;
  } catch (e) {
    console.log(e);
  }
};

const getdata = async (localtoken) => {
  try {
    const response = await axios.get(
      "https://budget-tracker-manoj.onrender.com/api/budget",

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localtoken}`,
        },
      }
    );
    const fetcheddata = response.data.response;

    return fetcheddata;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
const transactionfetcheddata = await getdata(localtoken);


const initialState = {
  token: localtoken,
  fetcheddata: transactionfetcheddata,
  profile:await getProfile(localtoken)
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
  },
});

export const { setToken } = dataSlice.actions;
export default dataSlice.reducer;
