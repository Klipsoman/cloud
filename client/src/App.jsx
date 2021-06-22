import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "./api/user";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(authApi())
  })

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        {!isAuth && (
          <Switch>
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
