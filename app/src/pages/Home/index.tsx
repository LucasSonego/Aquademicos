import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    if (document.cookie.includes("authenticated")) {
      history.push("/aluno");
    } else {
      history.push("/login");
    }
  });

  return <></>;
};

export default Home;
