import React from "react";
import { FiMail, FiUser, FiLogOut } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { useHistory } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import api from "../../services/api";
import { Container, Page } from "./styles";
import UpdatePassword from "./UpdatePassword";
import UpdateUserData from "./UpdateUserData";

interface IUserData {
  id: string;
  name: string;
  email: string;
  school_class: {
    id: string;
    name: string;
  };
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
    <Page>
      <Container>
        <div className="user-data section">
          <h3 className="section-label">Aluno</h3>
          <div className="user">
            <FiUser />
            <h2>{data?.name}</h2>
          </div>
          <div className="email">
            <FiMail />
            <span>{data?.email}</span>
          </div>
          <div className="school-class">
            <SiGoogleclassroom />
            <span>{data?.school_class.name}</span>
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
