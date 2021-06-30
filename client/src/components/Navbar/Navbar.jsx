import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reducers/userReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getFilesApi, searchFilesApi } from "../../api/files";
import avatarLogo from "../../assets/imgs/avatarLogo.png"
import UploadAvaPopup from "./UploadAvaPopup/UploadAvaPopup";
import { API_URL } from "../../config.js";

function Navbar() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const currentUserEmail = useSelector((state) => state.user.currentUser.email);
  const [searchName, setSearchName] = useState("");
  const [timeToOut, setTimeToOut] = useState(false);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector(state=>state.user.currentUser)
  const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
  const [isPopupHidden, setIsPopupHidden] = useState(true);

  function handleSearch(e) {
    setSearchName(e.target.value);
    if (timeToOut) {
      clearTimeout(timeToOut);
    }
    if (e.target.value != "") {
      setTimeToOut(
        setTimeout(() => {
          dispatch(searchFilesApi(e.target.value));
        }, 500)
      );
    } else {
      dispatch(getFilesApi(currentDir));
    }
  }

  return (<>
    <div className={style.navbar}>
      <div className={style.navbarFlexContainer}>
        <div className={style.logotype}>Cloud App</div>
        {isAuth && (
          <div className={style.searchBlock}>
            <input
              type="text"
              value={searchName}
              onChange={handleSearch}
              placeholder="global search..."
              className={style.search}
            />
            <span className={style.searchLoop}><FontAwesomeIcon icon={faSearch} /></span>
          </div>
        )}

        <div className={style.navbarLinks}>
          {isAuth && <div className={style.avatarBlock} onClick={()=>setIsPopupHidden(false)}>
              <img src={avatar} alt="" className={style.avatarImg}/>
            </div>}
          {isAuth && (
            <span style={{ marginRight: 30 + "px" }}>{currentUserEmail}</span>
          )}
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
    {!isPopupHidden && <UploadAvaPopup closePopup={setIsPopupHidden}/>}
    </>
  );
}

export default Navbar;
