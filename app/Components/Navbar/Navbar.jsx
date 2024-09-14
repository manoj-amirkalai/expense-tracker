import React from "react";
import "./Navbar.css";
import Image from "next/image";
import logo from "@/assets/logo.png";
import profile from "@/assets/profile.png";
import Link from "next/link";

const Navbar = () => {
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
        />
      </div>
      {/* <span className="theme">
        <FaMoon />{" "}
      </span> */}
    </>
  );
};

export default Navbar;
