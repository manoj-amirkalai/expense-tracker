"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import Navbar from "../Components/Navbar/Navbar";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../Components/store/store";
import { setToken } from "../Components/store/reducer";

const Page = () => {
  const dispatch=useDispatch()
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
      const response = await fetch("https://money-tracker-2c20.onrender.com/api/user", {
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
      <div className="profile_container">
        <div className="profile_info">
          <h1>Profile</h1>
          <p>
            Username: <span>{data.name}</span>
          </p>
          <p>
            Email: <span>{data.email}</span>
          </p>

          <div>
            {" "}
            <Button disabled type="primary">
              Edit Profile
            </Button>
            <Button
              onClick={() => {
                dispatch(setToken(""))
                route.push("/")
                settoken("");
              }}
            >
              Sign Out
            </Button>
          </div>
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
