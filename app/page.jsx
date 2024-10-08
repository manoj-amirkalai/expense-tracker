"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { Button, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setToken } from "./Components/store/reducer";
import store from "./Components/store/store";

const LogSign = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.data.token);
  const route = useRouter();
  if (token) {
    route.push("/dashboard");
  }

  const [signup, setSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confrimpassword, setconfrimpassword] = useState("");

  const logIn = async () => {
    try {
      const res = await fetch(
        "https://budget-tracker-manoj.onrender.com/api/user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (res.ok === false) {
        message.error("Credentials not Matching");

        return;
      }
      if (res.ok === true) {
        message.success("Logged In");

        const data = await res.json();
        dispatch(setToken(data.token));
        route.push("/dashboard");
        setName("");
        setemail("");
        setpassword("");
        setconfrimpassword("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signUp = async () => {
    if (
      !name ||
      name.trim().length === 0 ||
      !email ||
      email.trim().length === 0 ||
      !password ||
      password.trim().length === 0 ||
      !confrimpassword ||
      password.trim().length === 0
    ) {
      if (!name || name.trim().length === 0) {
        message.error("Name is required");
      }
      if (!email || email.trim().length === 0) {
        message.error("Email is required");
      }
      if (!password || password.trim().length === 0) {
        message.error("Password is required");
      }
      if (!confrimpassword || password.trim().length === 0) {
        message.error("Confrim Password is required");
      }

      return;
    }

    if (!email.endsWith("@gmail.com") || email.length < 12) {
      return message.error("Invalid Email");
    }
    if (password !== confrimpassword) {
      return message.error("Credentials Not matching");
    }
    try {
      const res = await fetch(
        "https://budget-tracker-manoj.onrender.com/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );
      if (res.status === 500) {
        message.error("Email already Registered");
      }
      if (res.status === 201) {
        const data = await res.json();
        message.success("Account created");
        route.push("/dashboard");
        dispatch(setToken(data.token));

        setName("");
        setemail("");
        setpassword("");
        setconfrimpassword("");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="welcome_container">
      <div className="page">
        <Image className="welcome_profile" src={logo} alt="logo" />{" "}
        <h1 className="welcome">welcome to Budget Tracker</h1>{" "}
        {!signup && (
          <Input
            status=""
            className="welcome_input"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Enter your name"
          />
        )}
        <Input
          status=""
          className="welcome_input"
          value={email}
          type="email"
          onChange={(event) => {
            setemail(event.target.value);
          }}
          placeholder="E-mail"
        />{" "}
        <Input.Password
          status=""
          type="password"
          className="welcome_input"
          value={password}
          onChange={(event) => {
            setpassword(event.target.value);
          }}
          placeholder="Password"
        />{" "}
        {!signup && (
          <Input.Password
            type="password"
            status=""
            className="welcome_input"
            value={confrimpassword}
            onChange={(event) => {
              setconfrimpassword(event.target.value);
            }}
            placeholder="Confrim Password"
          />
        )}
        {signup ? (
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={logIn}
            className="log_sign"
          >
            Log in
          </Button>
        ) : (
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={signUp}
            className="log_sign"
          >
            {" "}
            Sign Up
          </Button>
        )}
        {signup ? (
          <p className="sign_log_message">
            Already have a account ?{" "}
            <span
              className="sign_log"
              onClick={() => {
                setName("");
                setemail("");
                setpassword("");
                setconfrimpassword("");
                setSignup(!signup);
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="sign_log_message">
            New User ?{" "}
            <span
              className="sign_log"
              onClick={() => {
                setName("");
                setemail("");
                setpassword("");
                setconfrimpassword("");
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
  );
};

const page = () => {
  return (
    <Provider store={store}>
      <LogSign />
    </Provider>
  );
};

export default page;
