"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import Navbar from "../Components/Navbar/Navbar";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState({});
  const route = useRouter();
  const [token, settoken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTkxYTY1ZjNiMTM5NmYxY2JlMzlmNCIsImlhdCI6MTcyNjU1MjY3N30.MjfZNgbzNmGwngQG_W_jrN9EAVpn9NraiJQgIw8o2qY"
  );
  useEffect(() => {
    if (!token) {
      route.push("/");
    }
  }, [token]);
  const getdata = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user", {
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
  useEffect(() => {
    console.log(data);
  }, [data]);
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

export default Page;
