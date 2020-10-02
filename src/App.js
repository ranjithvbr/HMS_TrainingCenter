import React, { Component } from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./commonstyle.css";
import Login from "./components/Login/Login";
import Forgot from "./components/Login/Forgot";
import ResetPassword from "./components/Login/ResetPassword";
import Drawerpage from "./components/Drawer page/Drawerpage";

// export const apiurl = "http://3.128.18.34:8158/api/v1/";
export const apiurl = "http://52.200.251.222:8158/api/v1/";
export default class App extends Component {
  render() {
    return (
      <div>
        <Router basename="trainingcenter/?/">
          <Route path="/" component={Login} exact />
          <Route path={"/forgot"} component={Forgot} exact />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/Home" component={Drawerpage} />
        </Router>
      </div>
    );
  }
}
