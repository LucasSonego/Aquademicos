import React from "react";
import { IoClose } from "react-icons/io5";

import { BackDrop, Wrapper, Container } from "./styles";

interface Props {
  title?: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const FloatingDiv: React.FC<Props> = (props) => {
  return (
    <>
      <Wrapper visible={props.visible} className={"app-safe-area"}>
        <Container>
          <div className="header">
            <h3 className="title">{props.title || ""}</h3>
            <button onClick={() => props.setVisible(false)}>
              <IoClose />
            </button>
          </div>
          <div className="children-wrapper">{props.children}</div>
        </Container>
      </Wrapper>
      <BackDrop
        visible={props.visible}
        onClick={() => props.setVisible(false)}
      />
    </>
  );
};

export default FloatingDiv;
