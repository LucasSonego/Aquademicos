import React, { useState } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { Dropdown } from "semantic-ui-react";
import InputWithIcon from "../../../components/InputWithIcon";
import showNotification from "../../../components/Notification";
import useFetch from "../../../hooks/useFetch";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";

const RegisterForm: React.FC = () => {
  const history = useHistory();
  const { data } = useFetch({ path: "/school_classes_public", params: {} });

  const [schoolClass, setSchoolClass] = useState("");
  const [name, setName] = useState("");
  const [nameWarning, setNameWarning] = useState(false);
  const [email, setEmail] = useState("");
  const [emailWarning, setEmailWarning] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordWarning, setPasswordWarning] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationWarning, setPasswordConfirmationWarning] =
    useState(false);

  const [bottomWarning, setBottomWarning] = useState("");

  async function handleSubmit() {
    !name && setNameWarning(true);
    !email && setEmailWarning(true);
    !password && setPasswordWarning(true);
    !passwordConfirmation && setPasswordConfirmationWarning(true);

    if (!schoolClass || !name || !email || !password || !passwordConfirmation) {
      setBottomWarning("Preencha todos os campos corretamente");
      return;
    }

    if (password.length < 6) {
      setPasswordWarning(true);
      setPasswordConfirmationWarning(true);
      setBottomWarning("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (password !== passwordConfirmation) {
      setPasswordWarning(true);
      setPasswordConfirmationWarning(true);
      setBottomWarning("Confirmação de senha não confere");
      return;
    } else {
      setPasswordWarning(false);
      setPasswordConfirmationWarning(false);
    }

    await api
      .post("/users", {
        school_class_id: schoolClass,
        name,
        email,
        password,
      })
      .then(async () => {
        showNotification({
          type: "info",
          title: "Sucesso",
          message: "Cadastro efetuado",
        });
        await api
          .post("/sessions", {
            email,
            password,
          })
          .then(() => {
            history.push("/");
          });
      })
      .catch((error) => {
        if (error?.response?.status === 409) {
          setEmailWarning(true);
          setBottomWarning("Este email já está cadastrado para outro usuário");
        }
      });
  }

  return (
    <Container>
      <div className="dropdown-wrapper-div">
        <SiGoogleclassroom />
        <Dropdown
          placeholder="Selecionar turma"
          fluid
          selection
          options={
            data
              ? data.map((item) => {
                  return { value: item.id, text: item.name };
                })
              : [{ text: "Buscando turmas...", value: "null" }]
          }
          value={schoolClass}
          onChange={(_, { value }) => setSchoolClass(`${value}`)}
        />
      </div>
      <div className="input-wrapper">
        <InputWithIcon
          type="text"
          placeholder="Nome"
          value={name}
          onChange={setName}
          warning={nameWarning}
          setWarning={setNameWarning}
        >
          <FiUser />
        </InputWithIcon>
      </div>
      <div className="input-wrapper">
        <InputWithIcon
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          warning={emailWarning}
          setWarning={setEmailWarning}
        >
          <FiMail />
        </InputWithIcon>
      </div>
      <div className="input-wrapper">
        <InputWithIcon
          type="password"
          placeholder="Senha"
          value={password}
          onChange={setPassword}
          warning={passwordWarning}
          setWarning={setPasswordWarning}
        >
          <FiLock />
        </InputWithIcon>
      </div>
      <div className="input-wrapper">
        <InputWithIcon
          type="password"
          placeholder="Confirmar senha"
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
          warning={passwordConfirmationWarning}
          setWarning={setPasswordConfirmationWarning}
        >
          <FiLock />
        </InputWithIcon>
      </div>
      <p className="bottom-warning">{bottomWarning}</p>
      <button
        className="submit-btn"
        type="button"
        onClick={() => handleSubmit()}
      >
        Criar Conta
      </button>
    </Container>
  );
};

export default RegisterForm;
