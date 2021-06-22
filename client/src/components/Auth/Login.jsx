import React, { useState } from "react";
import style from "./Login.module.css";
import Input from "../../utils/Input/Input";
import {loginApi} from "../../api/user"
import {useDispatch} from "react-redux"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  return (
    <div className={style.login}>
      <div className={style.loginContainer}>
        <h3>Авторизация</h3>
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
        <button onClick={()=>dispatch(loginApi(email, password))}>Войти</button>
      </div>
    </div>
  );
}

export default Login;
