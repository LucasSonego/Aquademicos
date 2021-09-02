import React, { useState } from "react";
import { BsGearFill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { AiOutlineWarning } from "react-icons/ai";
import InputWithIcon from "../../../components/InputWithIcon";

import { Container } from "./styles";
import api from "../../../services/api";
import { useEffect } from "react";
import showNotification from "../../../components/Notification";

interface Props {
  id: string;
  name: string;
  students?: [
    {
      id: string;
      name: string;
      email: string;
    }
  ];
  onUpdate: (data) => void;
  onDelete: (id: string) => void;
}

const SchoolClass: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [listStudents, setListStudents] = useState(false);
  const [newName, setNewName] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setConfirmDelete(false);
  }, [expanded]);

  async function handleUpdate() {
    if (newName && newName !== props.name) {
      await api
        .put(`/school_classes/${props.id}`, { name: newName })
        .then((response) => {
          showNotification({
            type: "info",
            title: "Sucesso",
            message: "Turma atualizada",
          });
          props.onUpdate(response.data);
        });
    }
  }

  async function handleDelete() {
    await api.delete(`/school_classes/${props.id}`).then((response) => {
      showNotification({
        type: "info",
        title: "Turma removida",
      });
      props.onDelete(response.data.id);
    });
  }

  return (
    <Container>
      <div className="headers">
        <div className="left">
          <h3 className="name">{props.name}</h3>
          <div className="students">
            <h4 className="student-amount">Alunos: {props.students.length}</h4>
            {props.students.length > 0 && expanded && (
              <button
                onClick={() =>
                  listStudents ? setListStudents(false) : setListStudents(true)
                }
              >
                Listar alunos
              </button>
            )}
          </div>
        </div>

        <button
          className="expand-btn"
          onClick={() => (expanded ? setExpanded(false) : setExpanded(true))}
        >
          <BsGearFill />
        </button>
      </div>

      {expanded && (
        <>
          {listStudents && (
            <ul>
              {props.students.map((student) => (
                <li className="student" key={student.id}>
                  <p>{student.name}</p>
                  <span>{student.email}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="controls">
            <span className="label">Alterar nome</span>
            <InputWithIcon
              type="text"
              value={newName !== null ? newName : props.name}
              onChange={(value) => setNewName(value)}
            >
              <BiPencil />
            </InputWithIcon>
            <div className="buttons">
              <button
                className="update"
                disabled={
                  newName === null || newName === props.name || newName === ""
                }
                onClick={() => handleUpdate()}
              >
                Atualizar nome
              </button>
              <button
                className={`${confirmDelete ? "confirm" : "delete"}`}
                onClick={() =>
                  !confirmDelete ? setConfirmDelete(true) : handleDelete()
                }
              >
                {confirmDelete ? (
                  <>
                    <AiOutlineWarning /> Confirmar
                  </>
                ) : (
                  "Apagar turma"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default SchoolClass;
