"use client";
import React, { useState } from "react";
import "./page.css";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { Button, Input } from "antd";
const Page = () => {
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confrim, setconfrim] = useState("");
  return (
    <div className="welcome_container">
      <div className="page">
        <div className="welcome_logo">
          <Image className="welcome_profile" src={logo} alt="logo" />
        </div>
        <div className="welcome_board">
          {" "}
          <h1 className="welcome">welcome to Budget Tracker</h1>{" "}
          {!signup && (
            <Input
              status=""
              className="welcome_input"
              // value={paidby}
              // onChange={(event) => {
              //   setPaidby(event.target.value);
              // }}
              placeholder="Enter your name"
            />
          )}
          <Input
            status=""
            className="welcome_input"
            // value={paidby}
            // onChange={(event) => {
            //   setPaidby(event.target.value);
            // }}
            placeholder="E-mail"
          />{" "}
          <Input
            status=""
            className="welcome_input"
            // value={paidby}
            // onChange={(event) => {
            //   setPaidby(event.target.value);
            // }}
            placeholder="Password"
          />{" "}
          {!signup && (
            <Input
              status=""
              className="welcome_input"
              // value={paidby}
              // onChange={(event) => {
              //   setPaidby(event.target.value);
              // }}
              placeholder="Confrim Password"
            />
          )}
          {signup ? (
            <Button
              key="submit"
              type="primary"
              // loading={loading}
              // onClick={handleUpdate}
              className="add_update"
            >
              Log in
            </Button>
          ) : (
            <Button
              key="submit"
              type="primary"
              // loading={loading}
              // onClick={handleOk}
              className="add_update"
            >
              {" "}
              Sign Up
            </Button>
          )}
          {signup ? (
            <p>
              Already have a account ?{" "}
              <span
                className="sign_log"
                onClick={() => {
                  setSignup(!signup);
                }}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              New User ?{" "}
              <span
                className="sign_log"
                onClick={() => {
                  setSignup(!signup);
                }}
              >
                {" "}
                Log In{" "}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
