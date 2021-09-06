import React, { useState } from "react";
import { FiMail, FiUser } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../../services/api";
import showNotification from "../../../components/Notification";
import InputWithIcon from "../../../components/InputWithIcon";

interface Props {
  data: {
    id: string;
    name: string;
    email: string;
    school_class: {
      id: string;
      name: string;
    };
    created_at: string;
  };
  mutate(data: any, shouldRevalidate: Boolean): Promise<any>;
}

const UpdateUserData: React.FC<Props> = ({ data, mutate }) => {
  const [newUserName, setNewUserName] = useState(data?.name);
  const [newEmail, setNewEmail] = useState(data?.email);
  const [emailWarning, setEmailWarning] = useState(false);
  const [bottomWarning, setBottomWarning] = useState("");

  async function handleUpdateUserData() {
    setBottomWarning("");

    let newData: { name?: string; email?: string } = {};
    if (newUserName && newUserName !== data.name) {
      newData = { ...newData, name: newUserName };
    }
    if (newEmail && newEmail !== data.email) {
      newData = { ...newData, email: newEmail };
    }

    if (!newData.email && !newData.name) {
      return;
    }

    await api
      .put("/users", { ...newData })
      .then((response) => {
        if (response?.status === 200) {
          showNotification({
            title: "Sucesso",
            message: "Seus dados foram atualizados",
            type: "info",
          });
          mutate({ ...data, ...newData }, true);
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          setBottomWarning("Este email ja está cadastrado para outro usuário");
          setEmailWarning(true);
        }
      });
  }

  return (
    <Container>
      <div className="update-user-data section">
        <h3 className="section-label">Atualizar dados</h3>
        <span className="label">Nome</span>
        <InputWithIcon
          type="text"
          value={newUserName ? newUserName : data ? data.name : ""}
          onChange={(value) => setNewUserName(value)}
        >
          <FiUser />
        </InputWithIcon>
        <div className="input-wrapper">
          <span className="label">Email</span>
          <InputWithIcon
            type="email"
            value={newEmail ? newEmail : data ? data.email : ""}
            onChange={(value) => setNewEmail(value)}
            warning={emailWarning}
            setWarning={setEmailWarning}
          >
            <FiMail />
          </InputWithIcon>
        </div>
        <p className="warning">{bottomWarning}</p>

        <button onClick={() => handleUpdateUserData()}>Atualizar dados</button>
      </div>
    </Container>
  );
};

export default UpdateUserData;
