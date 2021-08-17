import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "./util/PrivateRoute";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
