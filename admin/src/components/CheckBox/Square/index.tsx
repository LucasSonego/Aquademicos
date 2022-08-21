import React from "react";
import { BiCheck } from "react-icons/bi";

import { Container } from "./styles";

interface Props {
  checked: boolean;
}

const SquareCheckBox: React.FC<Props> = (props) => {
  return (
    <Container checked={props.checked}>
      <div className="square-border">
        <BiCheck />
      </div>
    </Container>
  );
};

export default SquareCheckBox;
