import React, { useState } from "react";
import DatePicker from "../../../../components/DatePicker";
import FloatingDiv from "../../../../components/FloatingDiv";
import showNotification from "../../../../components/Notification";
import api from "../../../../services/api";

import { Container } from "./styles";

interface Props {
  lessonId: string;
  schoolClassId: string;
  currentDate: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  onSuccess: () => void;
}

const EditDate: React.FC<Props> = (props) => {
  const [newDate, setNewDate] = useState("");

  async function updateDate() {
    await api
      .put("/class_lessons", {
        lessonId: props.lessonId,
        schoolClassId: props.schoolClassId,
        publicAt: newDate,
      })
      .then(() => {
        props.onSuccess();
        showNotification({
          type: "info",
          message: "Data de publicação atualizada",
        });
        props.setVisible(false);
      });
  }

  return (
    <FloatingDiv
      visible={props.visible}
      setVisible={props.setVisible}
      title="Alterar Data"
    >
      {props.visible ? (
        <Container>
          <span className="label">Disponivel em:</span>
          <DatePicker
            onChange={(value) => setNewDate(new Date(value).toISOString())}
            defaultValue={props.currentDate}
          />
          <button
            className="submit"
            disabled={newDate === "" || newDate === props.currentDate}
            onClick={() => updateDate()}
          >
            Alterar data
          </button>
        </Container>
      ) : (
        <></>
      )}
    </FloatingDiv>
  );
};

export default EditDate;
