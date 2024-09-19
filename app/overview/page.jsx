"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import Navbar from "../Components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../Components/store/store";

const Page = () => {
  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.data.token);
  const [token, settoken] = useState(tokens);
  const [data, setData] = useState({});
  const route = useRouter();
  useEffect(() => {
    if (!token) {
      route.push("/");
    }
  }, [token]);
  const getdata = async () => {
    try {
      const response = await fetch("https://budget-tracker-manoj.onrender.com/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const profiledata = await response.json();

      setData(profiledata.message);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getdata();
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="overview_container">
        <div className="overview_info">
          <h4>
            This section is currently under development and will be available in
            the future. We apologize for any inconvenience this may cause.
          </h4>
        </div>
      </div>
    </>
  );
};

const page = () => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
};

export default page;
