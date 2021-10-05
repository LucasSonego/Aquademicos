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
        onChange={(getValue) => props.onChange(getValue())}
        placeholder={`Use "/" ou clique em "+" para opções de formatação.`}
        readOnly={props.readOnly || false}
      />
    </Container>
  );
};

export default Markdown;
