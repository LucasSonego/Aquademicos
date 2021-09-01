import React, { useRef, useState } from "react";

import { Container, Input } from "./styles";

interface IProps {
  type: "email" | "number" | "text" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  warning?: boolean;
  setWarning?: (value: boolean) => void;
}

const InputWithIcon: React.FC<IProps> = (props) => {
  const inputEl = useRef(null);

  const [focus, setFocus] = useState<boolean>(false);

  return (
    <Container
      onClick={() => {
        if (props.setWarning && props.warning) {
          props.setWarning(false);
        }
        setFocus(true);
        inputEl.current.focus();
      }}
      focus={focus}
      warning={props.warning || false}
    >
      {props.children}
      <Input
        type={props.type}
        placeholder={props.placeholder ? props.placeholder : ""}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        ref={inputEl}
        onBlur={() => setFocus(false)}
        focus={focus}
        onFocus={() => !focus && setFocus(true)}
      />
    </Container>
  );
};

export default InputWithIcon;
