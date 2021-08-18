import React, { useRef, useState } from "react";

import { Container, Input } from "./styles";

interface IProps {
  type: "email" | "number" | "text" | "password";
  placeholder: string;
}

const InputWithIcon: React.FC<IProps> = (props) => {
  const inputEl = useRef(null);

  const [focus, setFocus] = useState<boolean>(false);

  return (
    <Container
      onClick={() => {
        setFocus(true);
        inputEl.current.focus();
      }}
      focus={focus}
    >
      {props.children}
      <Input
        type={props.type}
        placeholder={props.placeholder}
        ref={inputEl}
        onBlur={() => setFocus(false)}
        focus={focus}
      />
    </Container>
  );
};

export default InputWithIcon;
