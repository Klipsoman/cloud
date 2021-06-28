import React from "react";
import style from "./Loader.module.css"

function Loader(props) {
  return (
    <div className={style.loader}>
        <div className={style.ldsdualring}></div>
    </div>
  );
}

export default Loader;
