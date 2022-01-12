import React from "react";
import { useState } from "react";
import { FiMail, FiUser, FiLock } from "react-icons/fi";
import { FaChevronUp } from "react-icons/fa";

import api from "../../../../services/api";
import InputWithIcon from "../../../../components/InputWithIcon";
import showNotification from "../../../../components/Notification";
import { SimplifiedSchoolClassData, StudentData } from "../../interfaces";

import { Container } from "./styles";
import { Dropdown } from "semantic-ui-react";

interface Props extends StudentData {
  schoolClassId: string;
  schoolClassList: SimplifiedSchoolClassData[];
  onUpdate: (data: StudentData) => void;
  onMove: (id: string) => void;
}

const Student: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [newName, setNewName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [userDataWarning, setUserDataWarning] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");

  const [newSchoolClass, setNewSchoolClass] = useState(null);

  async function handleUserDataUpdate() {
    let newData = {};
    if (newName && newName !== props.name) {
      newData = { ...newData, name: newName };
    }
    if (newEmail && newEmail !== props.email) {
      newData = { ...newData, email: newEmail };
    }

    if (newData !== {}) {
      await api
        .put("/students", {
          id: props.id,
          ...newData,
        })
        .then((response) => {
          showNotification({
            type: "info",
            title: "Sucesso",
            message: "Dados do aluno atualizados",
          });
          props.onUpdate(response.data);
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            setUserDataWarning(
              "Este email já está cadastrado para outro usuário"
            );
          }
        });
    }
  }

  async function handlePasswordUpdate() {
    if (newPassword.length < 6) {
      setPasswordWarning("A senha deve conter ao menos 6 caracteres");
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      setPasswordWarning("Confirmação de senha não confere");
      return;
    }
    await api
      .put("/students", {
        id: props.id,
        password: newPassword,
      })
      .then(() => {
        showNotification({
          type: "info",
          title: "Sucesso",
          message: "Senha alterada",
        });
      })
      .catch((error) => error);
  }

  async function handleSchoolClassUpdate() {
    if (newSchoolClass !== props.schoolClassId) {
      await api
        .put("/students", {
          id: props.id,
          school_class_id: newSchoolClass,
        })
        .then(() => {
          showNotification({
            type: "info",
            title: "Sucesso",
            message: "Aluno movido para outra turma",
          });
          props.onMove(props.id);
        })
        .catch((error) => error);
    }
  }

  return (
    <Container
      onClick={() => !expanded && setExpanded(true)}
      expanded={expanded}
    >
      {expanded ? (
        <>
          <div className="header">
            <h4>Aluno</h4>
            <button onClick={() => setExpanded(false)}>
              <FaChevronUp />
            </button>
          </div>
          <div className="forms">
            <div className="form student-data">
              <div className="field">
                <span className="label">Nome</span>
                <InputWithIcon
                  type="text"
                  value={newName !== null ? newName : props.name}
                  onChange={setNewName}
                >
                  <FiUser />
                </InputWithIcon>
              </div>
              <div className="field">
                <span className="label">Email</span>
                <InputWithIcon
                  type="email"
                  value={newEmail !== null ? newEmail : props.email}
                  onChange={setNewEmail}
                  warning={!!userDataWarning}
                  setWarning={(_v) => setUserDataWarning("")}
                >
                  <FiMail />
                </InputWithIcon>
              </div>
              <p className="error">{userDataWarning}</p>
              <button
                disabled={
                  (!newName || newName === props.name) &&
                  (!newEmail || newEmail === props.email)
                }
                onClick={() => handleUserDataUpdate()}
              >
                Atualizar dados
              </button>
            </div>
            <div className="form student-password">
              <div className="field">
                <span className="label">Nova Senha</span>
                <InputWithIcon
                  type="password"
                  placeholder="senha"
                  value={newPassword}
                  onChange={setNewPassword}
                  warning={!!passwordWarning}
                  setWarning={() => setPasswordWarning("")}
                >
                  <FiLock />
                </InputWithIcon>
              </div>
              <div className="field">
                <span className="label">Confirmar Senha</span>
                <InputWithIcon
                  type="password"
                  placeholder="senha"
                  value={newPasswordConfirmation}
                  onChange={setNewPasswordConfirmation}
                  warning={!!passwordWarning}
                  setWarning={() => setPasswordWarning("")}
                >
                  <FiLock />
                </InputWithIcon>
              </div>
              <p className="error">{passwordWarning}</p>
              <button
                disabled={!newPassword || !newPasswordConfirmation}
                onClick={() => handlePasswordUpdate()}
              >
                Alterar Senha
              </button>
            </div>
          </div>

          <div className="update-school-class">
            <div className="label">Turma</div>
            <div className="school-class-selection">
              <Dropdown
                placeholder="Selecionar turma"
                fluid
                selection
                options={
                  props.schoolClassList
                    ? props.schoolClassList.map((item) => {
                        return { value: item.id, text: item.name };
                      })
                    : [{ text: "Buscando turmas...", value: "null" }]
                }
                value={newSchoolClass ? newSchoolClass : props.schoolClassId}
                onChange={(_, { value }) => setNewSchoolClass(`${value}`)}
              />
              <button
                disabled={
                  !newSchoolClass || newSchoolClass === props.schoolClassId
                }
                onClick={() => handleSchoolClassUpdate()}
              >
                Alterar turma
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>{props.name}</p>
          <span>{props.email}</span>
        </>
      )}
    </Container>
  );
};

export default Student;
