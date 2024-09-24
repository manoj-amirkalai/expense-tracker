"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import Navbar from "../Components/Navbar/Navbar";
import { Button, message, Spin } from "antd";
import { useRouter } from "next/navigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../Components/store/store";
import { setToken } from "../Components/store/reducer";

const Page = () => {
  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.data.token);
  const profile = useSelector((state) => state.data.profile);
  const [token, settoken] = useState(tokens);
  const [data, setData] = useState({});
  const route = useRouter();
  useEffect(() => {
    if (!token) {
      route.push("/");
      message.info("Please Login");
    }
    setData(profile);
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="profile_container">
        <div className="profile_info">
          <h1>Profile</h1>
          {data.name ? (
            <>
              <p>
                <span>Name: </span>
                <span>{data.name}</span>
              </p>
              <p>
                <span>Email: </span>
                <span>{data.email}</span>
              </p>
            </>
          ) : (
            <Spin className="spin" />
          )}

          <div className="buttons">
            {" "}
            <Button disabled type="primary">
              Edit Profile
            </Button>
            <Button
              onClick={() => {
                dispatch(setToken(""));
                route.push("/");
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
