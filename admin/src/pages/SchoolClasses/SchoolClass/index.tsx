import React, { useState } from "react";
import { BsGearFill } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { AiOutlineWarning } from "react-icons/ai";
import InputWithIcon from "../../../components/InputWithIcon";

import { Container } from "./styles";
import api from "../../../services/api";
import { useEffect } from "react";
import showNotification from "../../../components/Notification";
import Student from "./Student";
import {
  SchoolClassData,
  SimplifiedSchoolClassData,
  StudentData,
} from "../interfaces";

interface Props {
  id: string;
  name: string;
  students?: StudentData[];
  schoolClassList: SimplifiedSchoolClassData[];
  onUpdate: (data: SchoolClassData) => void;
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

  function handleUserUpdate(userData: {
    id: string;
    name: string;
    email: string;
  }) {
    let updatedStudents = [...props.students];
    let updatedUserId = updatedStudents.findIndex(
      (student) => student.id === userData.id
    );
    updatedStudents.splice(updatedUserId, 1, {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    });

    props.onUpdate({
      id: props.id,
      name: props.name,
      students: [...updatedStudents],
    });
  }

  function handleUserMoved(userId: string) {
    let updatedStudents = [...props.students];
    let movedUserId = updatedStudents.findIndex(
      (student) => student.id === userId
    );
    updatedStudents.splice(movedUserId, 1);
    props.onUpdate({
      id: props.id,
      name: props.name,
      students: [...updatedStudents],
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
                <Student
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  email={student.email}
                  schoolClassId={props.id}
                  schoolClassList={props.schoolClassList}
                  onUpdate={(userData) => handleUserUpdate(userData)}
                  onMove={(userId) => handleUserMoved(userId)}
                />
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
