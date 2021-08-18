import React from "react";
import InputWithIcon from "../../../components/InputWithIcon";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../services/api";

import { Container } from "./styles";

const LoginForm: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return;
    }

    await api
      .post("sessions", {
        email: email,
        password: password,
      })
      .then((response) => response.status === 200 && history.push("/"))
      .catch(
        (err) =>
          err.response.status === 401 && setWarning("Email ou senha incorretos")
      );
  }

  return (
    <Container>
      <InputWithIcon type="email" placeholder="Email">
        <FiMail />
      </InputWithIcon>
      <InputWithIcon type="password" placeholder="Senha">
        <FiLock />
      </InputWithIcon>
      <button type="submit">Entrar</button>
    </Container>
  );
};

export default LoginForm;
