import React from "react";

import { Container } from "./styles";

interface Props {
  checked: boolean;
}

const RoundCheckBox: React.FC<Props> = (props) => {
  return (
    <Container checked={props.checked}>
      <div className="round-border">
        <div className="center" />
      </div>
    </Container>
  );
};

export default RoundCheckBox;
