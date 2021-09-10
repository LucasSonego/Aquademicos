import React from "react";
import { FiMail, FiUser, FiLogOut } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import api from "../../services/api";
import { Page, Container } from "./styles";
import UpdatePassword from "./UpdatePassword";
import UpdateUserData from "./UpdateUserData";

interface IUserData {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

const User = () => {
  const history = useHistory();
  const {
    data,
    mutate,
  }: {
    data: IUserData;
    mutate: (data: any, shouldRevalidate: Boolean) => Promise<any>;
  } = useFetch({
    path: "/users",
    params: {},
  });

  async function handleDisconnect() {
    await api
      .delete("/sessions")
      .then(() => history.push("/login"))
      .catch(() => {
        document.cookie = `authenticated=true;expires=${new Date()}`;
        history.push("/login");
      });
  }

  return (
    <Page className="app-safe-area">
      <Container>
        <div className="user-data section">
          <h3 className="section-label">Orientador</h3>
          <div className="user">
            <FiUser />
            <h2>{data?.name}</h2>
          </div>
          <div className="email">
            <FiMail />
            <span>{data?.email}</span>
          </div>
          <button className="disconnect" onClick={() => handleDisconnect()}>
            <FiLogOut />
            <span>Sair</span>
          </button>
        </div>
        <div className="divider"></div>
        <UpdateUserData data={data} mutate={mutate} />
        <div className="divider"></div>
        <UpdatePassword />
      </Container>
    </Page>
  );
};

export default User;
