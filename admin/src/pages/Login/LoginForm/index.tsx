import React from "react";
import InputWithIcon from "../../../components/InputWithIcon";
import { FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../services/api";

import { Container } from "./styles";
import { AxiosResponse } from "axios";

interface Response extends AxiosResponse {
  data: {
    id: string;
    email: string;
    name: string;
    is_admin?: boolean;
    school_class?: {
      id: string;
      name: string;
    };
  };
}

const LoginForm: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [inputsWarning, setInputsWarning] = useState<boolean>(false);

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
      .then(async (response: Response) => {
        if (response?.status === 200) {
          if (response?.data?.is_admin) {
            history.push("/dados");
          } else {
            setWarning("Esta conta não tem permissões de orientador");
            setInputsWarning(true);
            await api.delete("/sessions").catch(() => {
              document.cookie = `authenticated=true;expires=${new Date()}`;
            });
          }
        }
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          setWarning("Email ou senha incorretos");
          setInputsWarning(true);
        }
      });
  }

  return (
    <Container onSubmit={handleSubmit}>
      <InputWithIcon
        type="email"
        placeholder="Email"
        value={email}
        onChange={(value) => setEmail(value)}
        warning={inputsWarning}
        setWarning={setInputsWarning}
      >
        <FiMail />
      </InputWithIcon>
      <InputWithIcon
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(value) => setPassword(value)}
        warning={inputsWarning}
        setWarning={setInputsWarning}
      >
        <FiLock />
      </InputWithIcon>
      <p>{warning}</p>
      <button type="submit">Entrar</button>
    </Container>
  );
};

export default LoginForm;
