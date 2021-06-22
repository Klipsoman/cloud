import React from "react";
import style from "./Input.module.css"

function Input(props) {
  return (
    <input
      className={style.input}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
}

export default Input;
