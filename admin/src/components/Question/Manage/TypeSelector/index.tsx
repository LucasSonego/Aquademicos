import React from "react";
import RoundCheckBox from "../../../CheckBox/Round";
import SquareCheckBox from "../../../CheckBox/Square";

import { ColoredLabel, Container } from "./styles";

interface Props {
  type: "single" | "multi";
  setType: (type: "single" | "multi") => void;
}

const TypeSelector: React.FC<Props> = (props) => {
  return (
    <Container>
      <span className="label">Tipo:</span>
      <button onClick={() => props.setType("single")}>
        <RoundCheckBox checked={props.type === "single"} />
        <ColoredLabel colored={props.type === "single"}>
          Resposta única
        </ColoredLabel>
      </button>
      <button onClick={() => props.setType("multi")}>
        <SquareCheckBox checked={props.type === "multi"} />
        <ColoredLabel colored={props.type === "multi"}>
          Resposta múltipla
        </ColoredLabel>
      </button>
    </Container>
  );
};

export default TypeSelector;
