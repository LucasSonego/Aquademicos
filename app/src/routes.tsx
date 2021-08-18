import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./util/PrivateRoute";
import Login from "./pages/Login";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
