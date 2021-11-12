import React from "react";
import Editor from "rich-markdown-editor";

import { Container } from "./styles";

interface Props {
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

const Markdown: React.FC<Props> = (props) => {
  return (
    <Container readOnly={props.readOnly || false}>
      <Editor
        defaultValue={props.defaultValue || ""}
        onChange={(getValue) => props.onChange(filterValue(getValue()))}
        placeholder={`Use "/" ou clique em "+" para opções de formatação.`}
        readOnly={props.readOnly || false}
      />
    </Container>
  );
};

export default Markdown;

function filterValue(value: string) {
  // when the editor is empty the value will be just "\n"
  if (value.length === 2) {
    if (value.charCodeAt(0) === 92 && value.charCodeAt(1) === 10) {
      return null;
    }
  }
  return value;
}
