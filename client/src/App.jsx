import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Registration from "./components/Auth/Registration";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/registration" component={Registration} />
          {/* <Route path="login" component={Login}/> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
