import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reducers/userReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className={style.navbar}>
      <div className={style.navbarFlexContainer}>
        <div className={style.logotype}>Cloud App</div>
        <div className={style.navbarLinks}>
          {!isAuth && (
            <div>
              <NavLink to="login">
                LogIn <FontAwesomeIcon icon={faSignInAlt} />
              </NavLink>{" "}
            </div>
          )}
          {!isAuth && (
            <div>
              <NavLink to="registration">
                Join <FontAwesomeIcon icon={faUser} />
              </NavLink>
            </div>
          )}
          {isAuth && (
            <div onClick={() => dispatch(logOut())}>
              <h3>
                LogOut <FontAwesomeIcon icon={faSignOutAlt} />
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
