import React from "react";
import "./Navbar.css";
import Image from "next/image";
import logo from "@/assets/logo.png";
import profile from "@/assets/profile.png";
import Link from "next/link";
import { FaMoon } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <Image className="profile" src={logo} width={50} height={50} alt="logo" />
        <div className="nav_items">
          <Link className="nav_item" href="/">
            Dashboard
          </Link>
      
          <Link className="nav_item" href="/transactions">
          Transactions
          </Link>
        </div>

        <Image className="profile" src={profile} width={50} height={50} alt="profile" />
      </div>
      {/* <span className="theme">
        <FaMoon />{" "}
      </span> */}
    </>
  );
};

export default Navbar;
