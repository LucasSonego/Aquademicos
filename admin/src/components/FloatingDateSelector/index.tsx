import React from "react";
import DatePicker from "../DatePicker";
import FloatingDiv from "../FloatingDiv";

import { Container } from "./styles";

interface IProps {
  title?: string;
  visible: boolean;
  setVisible: () => void;
  value: any;
  onChange: (newValue: any) => void;
}

const FloatingDateSelector: React.FC<IProps> = (props) => {
  return (
    <Container>
      <FloatingDiv
        title={props.title}
        visible={props.visible}
        setVisible={props.setVisible}
      >
        <DatePicker defaultValue={props.value} onChange={props.onChange} />
        {props.children}
      </FloatingDiv>
    </Container>
  );
};

export default FloatingDateSelector;
