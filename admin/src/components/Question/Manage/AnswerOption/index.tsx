import React from "react";
import RoundCheckBox from "../../../CheckBox/Round";
import SquareCheckBox from "../../../CheckBox/Square";
import { BiTrash } from "react-icons/bi";

import { IAnswerOption } from "../../interfaces";

import { Container } from "./styles";

interface Props {
  type: "single" | "multi";
  value: IAnswerOption;
  onChange: (value: IAnswerOption) => void;
  selected: boolean;
  onSelectChange: () => void;
  onDelete: () => void;
}

const AnswerOption: React.FC<Props> = (props) => {
  return (
    <Container>
      <div className="checkbox" onClick={() => props.onSelectChange()}>
        {props.type === "single" ? (
          <RoundCheckBox checked={props.selected} />
        ) : (
          <SquareCheckBox checked={props.selected} />
        )}
      </div>
      <input
        className="text-input"
        type="text"
        value={props.value.text}
        onChange={(event) =>
          props.onChange({ ...props.value, text: event.target.value })
        }
        placeholder="Resposta"
      />
      <button className="delete" onClick={() => props.onDelete()}>
        <BiTrash />
      </button>
    </Container>
  );
};

export default AnswerOption;
