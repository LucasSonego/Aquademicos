import React, { useState } from "react";
import { FiLock } from "react-icons/fi";

import api from "../../../services/api";
import showNotification from "../../../components/Notification";
import { Container } from "./styles";
import InputWithIcon from "../../../components/InputWithIcon";

const UpdatePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [oldPasswordWarning, setOldPasswordWarning] = useState(false);

  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");
  const [newPasswordWarning, setNewPasswordWarning] = useState(false);

  const [bottomWarning, setBottomWarning] = useState("");

  async function handleUpdatePassword() {
    setBottomWarning("");

    if (newPassword !== newPasswordConfirmation) {
      setBottomWarning(
        "Verifique se a senha e a confirmação de senha inseridas são iguais"
      );
      setNewPasswordWarning(true);
      return;
    }

    if (newPassword.length < 6) {
      setBottomWarning("A senha deve conter ao menos 6 caracteres");
      setNewPasswordWarning(true);
      return;
    }

    await api
      .put("/users", {
        password: newPassword,
        old_password: oldPassword,
      })
      .then((response) => {
        response.status === 200 &&
          showNotification({
            title: "Sucesso",
            message: "Seus dados foram atualizados",
            type: "success",
          });
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setBottomWarning("Verifique se a senha atual está correta");
          setOldPasswordWarning(true);
        }
      });
  }

  return (
    <Container>
      <div className="update-password section">
        <h3 className="section-label">Alterar senha</h3>
        <span className="label">Senha atual</span>
        <InputWithIcon
          type="password"
          value={oldPassword}
          onChange={(value) => setOldPassword(value)}
          warning={oldPasswordWarning}
          setWarning={setOldPasswordWarning}
          placeholder="senha"
        >
          <FiLock />
        </InputWithIcon>

        <div className="input-wrapper">
          <span className="label">Nova senha</span>
          <InputWithIcon
            type="password"
            value={newPassword}
            onChange={(value) => setNewPassword(value)}
            warning={newPasswordWarning}
            setWarning={setNewPasswordWarning}
            placeholder="senha"
          >
            <FiLock />
          </InputWithIcon>
        </div>

        <div className="input-wrapper">
          <span className="label">Confirmar nova senha</span>
          <InputWithIcon
            type="password"
            value={newPasswordConfirmation}
            onChange={(value) => setNewPasswordConfirmation(value)}
            warning={newPasswordWarning}
            setWarning={setNewPasswordWarning}
            placeholder="senha"
          >
            <FiLock />
          </InputWithIcon>
        </div>

        <p className="warning">{bottomWarning}</p>

        <button onClick={() => handleUpdatePassword()}>Alterar senha</button>
      </div>
    </Container>
  );
};

export default UpdatePassword;
