import React from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { Dropdown } from "semantic-ui-react";
import { SimplifiedSchoolClassData } from "../../pages/SchoolClasses/interfaces";

import { Container } from "./styles";

interface Props {
  data: SimplifiedSchoolClassData[];
  value: string;
  onChange: (newValue: String) => void;
}

const SchoolClassSelector: React.FC<Props> = (props) => {
  return (
    <Container>
      <div className="dropdown-wrapper-div">
        <SiGoogleclassroom />
        <Dropdown
          placeholder="Selecionar turma"
          fluid
          selection
          options={
            props.data
              ? props.data.map((item) => {
                  return { value: item.id, text: item.name };
                })
              : [{ text: "Buscando turmas...", value: "null" }]
          }
          value={props.value}
          onChange={(_, { value }) => props.onChange(`${value}`)}
        />
      </div>
    </Container>
  );
};

export default SchoolClassSelector;
