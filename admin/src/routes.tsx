import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Nav from "./components/NavBar";
import PrivateRoute from "./util/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import SchoolClasses from "./pages/SchoolClasses";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dados" component={User} />
        <PrivateRoute path="/turmas" component={SchoolClasses} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
