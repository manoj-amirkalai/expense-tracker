import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Link href="/">
          <Image className="profile" src={logo} alt="logo" />
        </Link>{" "}
        <div className="nav_items">
          <Link className="nav_item" href="/dashboard">
            Dashboard
          </Link>
          <Link className="nav_item" href="/dashboard">
            Overview
          </Link>
          <Link className="nav_item" href="/transactions">
            Transactions
          </Link>

          <Link className="nav_item" href="/profile">
            Profile
          </Link>
        </div>
      </div>
      {/* <span className="theme">
        <FaMoon />{" "}
      </span> */}
    </>
  );
};

export default Navbar;
