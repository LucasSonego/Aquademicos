import React from "react";
import { ISchoolClassLesson } from "../interfaces";

import { Container } from "./styles";

interface Props {
  data: ISchoolClassLesson;
}

const Lesson: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      {new Date() > new Date(data.public_at) ? (
        <div className="public">
          <h4>Disponivel</h4> <span>({formatDate(data.public_at)})</span>
        </div>
      ) : (
        <div className="public-at">
          Disponivel em {formatDate(data.public_at)}
        </div>
      )}

      <div className="text">
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
