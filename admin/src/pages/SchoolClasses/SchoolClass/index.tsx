import React from "react";

import { Container } from "./styles";

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
}

const SchoolClass: React.FC<Props> = (props) => {
  return (
    <Container>
      <h3 className="name">{props.name}</h3>
      <h4 className="student-amount">Alunos: {props.students.length}</h4>

      {props.students.length > 0 && (
        <ul>
          {props.students.map((student) => (
            <li className="student" key={student.id}>
              <p>{student.name}</p>
              <span>{student.email}</span>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default SchoolClass;
