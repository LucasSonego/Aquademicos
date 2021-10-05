import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import showNotification from "../../../../../components/Notification";
import api from "../../../../../services/api";

import { Container, DeleteButton, Option } from "./styles";

interface Props {
  schoolClassId: string;
  lessonId: string;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  onDelete: () => void;
}

const DeletionOptions: React.FC<Props> = (props) => {
  const [fullyDelete, setFullyDelete] = useState(false);

  async function deleteLesson() {
    await api.delete(`/lessons/${props.lessonId}`).then(() => {
      props.setExpanded(false);
      props.onDelete();
      showNotification({ type: "info", title: "Aula deletada" });
    });
  }

  async function removeLesson() {
    await api
      .delete(`/class_lessons`, {
        data: {
          lessonId: props.lessonId,
          schoolClassId: props.schoolClassId,
        },
      })
      .then(() => {
        props.setExpanded(false);
        props.onDelete();
        showNotification({ type: "info", title: "Aula removida" });
      });
  }

  return (
    <Container expanded={props.expanded}>
      {!props.expanded ? (
        <DeleteButton
          onClick={() => props.setExpanded(!props.expanded)}
          expanded={props.expanded}
        >
          <BsTrash />
        </DeleteButton>
      ) : (
        <div className="options">
          <Option selected={!fullyDelete} onClick={() => setFullyDelete(false)}>
            <div className="circle">
              <div className="dot" />
            </div>
            <div className="description">
              <h4>Remover desta turma</h4>
              <p>
                Desvincula a aula desta turma, a aula fica salva e pode ser
                utilizada em outras turmas.
              </p>
            </div>
          </Option>
          <Option selected={fullyDelete} onClick={() => setFullyDelete(true)}>
            <div className="circle">
              <div className="dot" />
            </div>
            <div className="description">
              <h4>Deletar aula</h4>
              <p>
                Esta aula será removida desta e de todas as outras turmas em que
                estiver sendo utilizada.
              </p>
            </div>
          </Option>
          <div className="buttons">
            <button
              className="confirm"
              onClick={() => (fullyDelete ? deleteLesson() : removeLesson())}
            >
              Confirmar
            </button>
            <button className="cancel" onClick={() => props.setExpanded(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default DeletionOptions;
