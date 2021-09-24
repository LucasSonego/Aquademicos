import React from "react";
import { RiCalendarEventFill } from "react-icons/ri";
import { BsPlay } from "react-icons/bs";

import { Container } from "./styles";
import { Lesson as ILesson } from "../interfaces";

interface Props extends ILesson {
  isPublic: boolean;
}

const Lesson: React.FC<Props> = (props) => {
  return (
    <Container isPublic={props.isPublic}>
      <div className="icon">
        {props.isPublic ? <BsPlay /> : <RiCalendarEventFill />}
      </div>
      <div className="text">
        <h3>{props.title}</h3>
        <p>
          {props.description || `Disponivel em ${formatDate(props.public_at)}`}
        </p>
      </div>
    </Container>
  );
};

export default Lesson;

function formatDate(date: string) {
  let baseDate = new Date(date);
  let day = baseDate.getDate();
  let month = baseDate.getMonth() + 1;
  let year = baseDate.getFullYear();
  return `${withZero(day)}/${withZero(month)}/${year}`;
}

function withZero(number: number | string) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}
