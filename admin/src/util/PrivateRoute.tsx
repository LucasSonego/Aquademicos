import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import api from "../services/api";
import useSWR from "swr";

export default function PrivateRoute({ component: Component, ...rest }) {
  const history = useHistory();

  let data;
  async function AwaitAsyncFunctions() {
    let response = useSWR("/sessions", async () => {
      try {
        const response = await api.get("/sessions");

        return response.data;
      } catch (error) {
        if (error?.response?.status === 401) {
          history.push("/login");
        }
      }
    });

    data = response.data;
  }

  if (document.cookie.includes("authenticated")) {
    AwaitAsyncFunctions();
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        document.cookie.includes("authenticated") ? (
          <Component {...props} userData={data} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export interface AuthenticatedRouteProps extends React.FC {
  userData: {
    id: string;
    name: string;
    email: string;
  };
}
