import React, { useState } from "react";

import { Container } from "./styles";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Login: React.FC = () => {
  const [panel, setPanel] = useState<"login" | "register">("login");

  return (
    <Container>
      <div className="header">
        <h1>Aquademicos</h1>
      </div>
      <div className="divider">
        <svg
          width="750"
          height="101"
          viewBox="0 0 750 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M423.5 1.50042C306.5 12.1759 214 152 0 1.49428V101H750V89.9943C645.333 60.4943 560.5 -11 423.5 1.50042Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="content">
        {panel === "login" && (
          <div className="login">
            <LoginForm />
          </div>
        )}
        {panel === "register" && (
          <div className="register">
            <RegisterForm />
          </div>
        )}
        <div className="or">
          <div className="hl" />
          <span>OU</span>
          <div className="hl" />
        </div>
        <button
          className="switch-panel"
          onClick={() =>
            panel === "login" ? setPanel("register") : setPanel("login")
          }
        >
          {panel === "login" ? "Criar Conta" : "Login"}
        </button>
      </div>
    </Container>
  );
};

export default Login;
