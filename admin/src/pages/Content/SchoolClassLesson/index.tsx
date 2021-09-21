import React, { useState } from "react";
import { ISchoolClassLesson } from "../interfaces";
import EditDate from "./EditDate";
import EditLesson from "./EditLesson";

import { Container } from "./styles";

interface Props {
  data: ISchoolClassLesson;
  updateContent: () => void;
}

const Lesson: React.FC<Props> = ({ data, updateContent }) => {
  const [editDateVisible, setEditDateVisible] = useState(false);
  const [editLessonVisible, setEditLessonVisible] = useState(false);

  return (
    <Container>
      {new Date() > new Date(data.public_at) ? (
        <div className="public" onClick={() => setEditDateVisible(true)}>
          <h4>Disponivel</h4> <span>({formatDate(data.public_at)})</span>
        </div>
      ) : (
        <div className="public-at" onClick={() => setEditDateVisible(true)}>
          Disponivel em {formatDate(data.public_at)}
        </div>
      )}
      <EditDate
        lessonId={data.lesson.id}
        schoolClassId={data.school_class_id}
        currentDate={data.public_at}
        visible={editDateVisible}
        setVisible={setEditDateVisible}
        onSuccess={updateContent}
      />
      <EditLesson
        visible={editLessonVisible}
        setVisible={setEditLessonVisible}
        data={data}
        onSuccess={updateContent}
      />
      <div className="text" onClick={() => setEditLessonVisible(true)}>
        <h3>{data.lesson.title}</h3>
        <p>{data.lesson.description}</p>
      </div>
    </Container>
  );
};

export default Lesson;

function withZero(number: number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

function formatDate(date: string) {
  let dateTime = new Date(date);
  let day = withZero(dateTime.getDate());
  let month = withZero(dateTime.getMonth() + 1);
  let year = dateTime.getFullYear();

  return `${day}/${month}/${year}`;
}
