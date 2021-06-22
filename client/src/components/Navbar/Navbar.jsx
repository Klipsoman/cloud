import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={style.navbar}>
      <div>Cloud App</div>
      <div className={style.navbarLinks}>
        <div><NavLink to="login">LogIn</NavLink> </div>
        <div><NavLink to="registration">Join</NavLink></div>
        <div><NavLink to="/">LogOut</NavLink></div>
      </div>
    </div>
  );
}

export default Navbar;
