import React from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";

import { DeletedSchoolClass } from "../interfaces";

import { Container } from "./styles";

interface Props {
  data: DeletedSchoolClass;
  onRestore: (id: string) => void;
}

function withZero(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

const DeletedClass: React.FC<Props> = ({ data, onRestore }) => {
  let date: Date;
  if (data?.deleted_at) {
    date = new Date(data.deleted_at);
  } else {
    date = new Date();
  }

  let dateString = `${withZero(date.getDate())}/${withZero(
    date.getMonth() + 1
  )} as ${withZero(date.getHours())}:${withZero(date.getMinutes())}`;

  return (
    <Container>
      <div className="details">
        <h3>{data.name}</h3>
        <p>
          Deletado em {dateString} por {data?.deleted_by?.name || "Orientador"}
        </p>
      </div>
      <button className="restore" onClick={() => onRestore(data.id)}>
        <FaTrashRestoreAlt /> Restaurar
      </button>
    </Container>
  );
};

export default DeletedClass;
