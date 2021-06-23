import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reducers/userReducer";

function Navbar() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch()

  return (
    <div className={style.navbar}>
      <div className={style.logotype}>Cloud App</div>
      <div className={style.navbarLinks}>
          
        {!isAuth && <div><NavLink to="login">LogIn</NavLink> </div>}
        {!isAuth && <div><NavLink to="registration">Join</NavLink></div>}
        {isAuth && <div><h3 onClick={()=>dispatch(logOut())}>LogOut</h3></div>}
      </div>
    </div>
  );
}

export default Navbar;
