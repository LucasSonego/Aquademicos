import React from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { Dropdown } from "semantic-ui-react";
import InputWithIcon from "../../../components/InputWithIcon";

import { Container } from "./styles";

const RegisterForm: React.FC = () => {
  return (
    <Container>
      <div className="dropdown-wrapper-div">
        <SiGoogleclassroom />
        <Dropdown
          placeholder="Selecionar turma"
          fluid
          selection
          options={[
            { key: 1, text: "Turma 1", value: 1 },
            { key: 2, text: "Turma 2", value: 2 },
          ]}
        />
      </div>
      <div className="input-wrapper">
        <InputWithIcon type="text" placeholder="Nome">
          <FiUser />
        </InputWithIcon>
      </div>
      <div className="input-wrapper">
        <InputWithIcon type="email" placeholder="Email">
          <FiMail />
        </InputWithIcon>
      </div>
      <div className="input-wrapper">
        <InputWithIcon type="password" placeholder="Senha">
          <FiLock />
        </InputWithIcon>
      </div>
      <div className="input-wrapper">
        <InputWithIcon type="password" placeholder="Confirmar senha">
          <FiLock />
        </InputWithIcon>
      </div>
      <button className="submit-btn" type="submit">
        Criar Conta
      </button>
    </Container>
  );
};

export default RegisterForm;
