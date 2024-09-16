import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Image from "next/image";
import logo from "@/assets/logo.png";
import profile from "@/assets/profile.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const route = useRouter();
  const [token, settoken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (!token) {
      route.push("/");
    }
  }, [token]);
  return (
    <>
      <div className="navbar">
        <Link href="/">
          <Image
            className="profile"
            src={logo}
            width={50}
            height={50}
            alt="logo"
          />
        </Link>{" "}
        <div className="nav_items">
          <Link className="nav_item" href="/dashboard">
            Dashboard
          </Link>

          <Link className="nav_item" href="/transactions">
            Transactions
          </Link>
        </div>
        <Image
          className="profile"
          src={profile}
          width={50}
          height={50}
          alt="profile"
          onClick={() => {
            localStorage.setItem("token", "");
            settoken("");
          }}
        />
      </div>
      {/* <span className="theme">
        <FaMoon />{" "}
      </span> */}
    </>
  );
};

export default Navbar;
