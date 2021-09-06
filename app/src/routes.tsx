import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Nav from "./components/NavBar";
import PrivateRoute from "./util/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/aluno" component={User} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
