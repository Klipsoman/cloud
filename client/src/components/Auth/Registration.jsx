import React, { useState } from "react";
import style from "./Registration.module.css";
import Input from "../../utils/Input/Input";
import { registartionApi } from "../../api/user";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={style.registration}>
      <div className={style.registrationContainer}>
        <h3>Регистрация</h3>
        <Input
          type="text"
          placeholder="Введите email"
          value={email}
          setValue={setEmail}
        />
        <Input
          type="password"
          placeholder="Введите пароль"
          value={password}
          setValue={setPassword}
        />
        {/* <Input type="password" placeholder="Введите пароль еще раз"/> */}
        <button onClick={(e)=>registartionApi(email, password)}>Отправить</button>
      </div>
    </div>
  );
}

export default Registration;
