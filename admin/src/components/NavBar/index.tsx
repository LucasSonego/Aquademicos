import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { IoFish } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

import api from "../../services/api";
import { Container, Tab } from "./styles";

const notVisibleOn = ["/login"];

const Nav: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

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
    <Container
      visible={!notVisibleOn.find((route) => route === location.pathname)}
    >
      <div className="navigation">
        <Link to="dados">
          <Tab selected={location.pathname === "/dados"}>
            <AiOutlineUser />
            <span className="label">Orientador</span>
          </Tab>
        </Link>
        <Link to="turmas">
          <Tab selected={location.pathname === "/turmas"}>
            <SiGoogleclassroom />
            <span className="label">Turmas</span>
          </Tab>
        </Link>
        <Link to="conteudo">
          <Tab selected={location.pathname === "/conteudo"}>
            <svg
              className="inline-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.45293 0.212407C8.38543 0.145081 8.30522 0.0916619 8.2169 0.0552123C8.12859 0.0187628 8.0339 0 7.93828 0C7.84265 0 7.74797 0.0187628 7.65965 0.0552123C7.57134 0.0916619 7.49113 0.145081 7.42363 0.212407L3.568 4.02247L2.19358 2.69127C2.12608 2.62394 2.04588 2.57052 1.95756 2.53407C1.86925 2.49762 1.77456 2.47886 1.67893 2.47886C1.58331 2.47886 1.48862 2.49762 1.40031 2.53407C1.31199 2.57052 1.23179 2.62394 1.16429 2.69127L0.213698 3.63731C0.145963 3.70441 0.0922191 3.78413 0.0555479 3.87191C0.0188768 3.95969 0 4.0538 0 4.14885C0 4.2439 0.0188768 4.33801 0.0555479 4.42579C0.0922191 4.51358 0.145963 4.5933 0.213698 4.66039L3.09513 7.51297C3.23895 7.64886 3.42981 7.72464 3.62824 7.72464C3.82668 7.72464 4.01753 7.64886 4.16136 7.51297L5.10529 6.57295L9.47678 2.22847C9.61298 2.09298 9.68994 1.90958 9.69096 1.71805C9.69198 1.52652 9.61698 1.34231 9.48222 1.20539L8.45293 0.212407ZM30.0312 21.1855H12.5937C12.3368 21.1855 12.0904 21.287 11.9087 21.4675C11.727 21.6481 11.625 21.893 11.625 22.1484V24.0742C11.625 24.3296 11.727 24.5745 11.9087 24.7551C12.0904 24.9357 12.3368 25.0371 12.5937 25.0371H30.0312C30.2882 25.0371 30.5346 24.9357 30.7163 24.7551C30.8979 24.5745 31 24.3296 31 24.0742V22.1484C31 21.893 30.8979 21.6481 30.7163 21.4675C30.5346 21.287 30.2882 21.1855 30.0312 21.1855ZM30.0312 1.92757H12.5937C12.3368 1.92757 12.0904 2.02902 11.9087 2.20959C11.727 2.39017 11.625 2.63509 11.625 2.89047V4.81626C11.625 5.07164 11.727 5.31655 11.9087 5.49713C12.0904 5.67771 12.3368 5.77916 12.5937 5.77916H30.0312C30.2882 5.77916 30.5346 5.67771 30.7163 5.49713C30.8979 5.31655 31 5.07164 31 4.81626V2.89047C31 2.63509 30.8979 2.39017 30.7163 2.20959C30.5346 2.02902 30.2882 1.92757 30.0312 1.92757ZM30.0312 11.5565H12.5937C12.3368 11.5565 12.0904 11.658 11.9087 11.8386C11.727 12.0191 11.625 12.2641 11.625 12.5194V14.4452C11.625 14.7006 11.727 14.9455 11.9087 15.1261C12.0904 15.3067 12.3368 15.4081 12.5937 15.4081H30.0312C30.2882 15.4081 30.5346 15.3067 30.7163 15.1261C30.8979 14.9455 31 14.7006 31 14.4452V12.5194C31 12.2641 30.8979 12.0191 30.7163 11.8386C30.5346 11.658 30.2882 11.5565 30.0312 11.5565Z"
                fill=""
              />
              <path
                d="M1 13.5V17C1 17 1 17.5 1.8125 17C2.09216 16.8279 5.66381 14.63 7 13.8077C7.29295 13.6274 7.29099 13.3714 7 13.1923C6.92353 13.1453 2.46481 10.4014 1.8125 10C1 9.5 1 10 1 10V10.6938V13.5Z"
                fill=""
              />
              <path
                d="M4.16136 21.4675C6.16136 21.4675 6.16136 24.5417 4.16136 24.5417C2.16136 24.5417 2.16136 21.4675 4.16136 21.4675Z"
                fill=""
              />
            </svg>

            <span className="label">Conteúdo</span>
          </Tab>
        </Link>
        <Link to="atividades">
          <Tab selected={location.pathname === "/atividades"}>
            <svg
              className="inline-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 0H33V2H13V0Z" fill="" />
              <path d="M13 3H33V5H13V3Z" fill="" />
              <path d="M13 6H33V8H13V6Z" fill="" />
              <path d="M13 11H33V13H13V11Z" fill="" />
              <path d="M13 14H33V16H13V14Z" fill="" />
              <path d="M13 17H33V19H13V17Z" fill="" />
              <path d="M13 22H33V24H13V22Z" fill="" />
              <path d="M13 25H33V27H13V25Z" fill="" />
              <path d="M13 28H33V30H13V28Z" fill="" />
              <path d="M6 1.875V5.625H2V1.875H6ZM8 0H0V7.5H8V0Z" fill="" />
              <path
                d="M6 24.375V28.125H2V24.375H6ZM8 22.5H0V30H8V22.5Z"
                fill=""
              />
              <path
                d="M11 10.9056L9.75472 9.375L7.88679 11.0969H0V18.75H8.30189V13.3929L11 10.9056ZM5.60377 13.0102L4.15094 14.3495L2.49057 13.0102H5.60377ZM2.07547 15.3061L3.9434 16.8367H2.07547V15.3061ZM6.22641 16.8367H4.35849L6.22641 15.1148V16.8367Z"
                fill=""
              />
            </svg>
            <span className="label">Atividades</span>
          </Tab>
        </Link>
        <Link to="aquario">
          <Tab selected={location.pathname === "/aquario"}>
            <IoFish />
            <span className="label">Aquário</span>
          </Tab>
        </Link>
        <Tab className="disconnect" onClick={() => handleDisconnect()}>
          <FiLogOut />
          <span className="label">Sair</span>
        </Tab>
      </div>
    </Container>
  );
};

export default Nav;
