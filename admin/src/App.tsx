import React from "react";
import Routes from "./routes";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

function App() {
  return (
    <>
      <ReactNotification />
      <Routes />
    </>
  );
}

export default App;
