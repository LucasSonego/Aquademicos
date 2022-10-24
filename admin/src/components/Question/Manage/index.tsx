import React from "react";
import randomBase64 from "random-base64-string";
import { ImPlus } from "react-icons/im";
import { IQuestion, IAnswerOption } from "../interfaces";
import TypeSelector from "./TypeSelector";
import AnswerOption from "./AnswerOption";

import { Container } from "./styles";

interface IProps {
  value?: IQuestion;
  onChange?: (newValue: IQuestion) => void;
}

const ManageQuestion: React.FC<IProps> = (props) => {
  function handleDescriptionChange(newValue: string) {
    props.onChange({ ...props.value, description: newValue });
  }

  function handleTypeChange(newType) {
    if (newType !== props.value.type) {
      let newValue = { ...props.value };
      let newAnswerOptions = props.value.answerOptions.map((option) => {
        return {
          ...option,
          selected: false,
        };
      });
      newValue.type = newType;
      newValue.answerOptions = newAnswerOptions;
      props.onChange(newValue);
    }
  }

  function handleAddAnswerOption() {
    let updatedAnswerOptions = [...props.value.answerOptions];
    let id: string;
    while (!id) {
      let randomIdentifier = randomBase64(4);
      if (
        !(
          updatedAnswerOptions.findIndex(
            (item) => item.id === `${randomIdentifier}`
          ) > 0
        )
      ) {
        id = `${randomIdentifier}`;
      }
    }

    updatedAnswerOptions.push({ text: "", id, selected: false });
    props.onChange({ ...props.value, answerOptions: updatedAnswerOptions });
  }

  function handleAnswerOptionUpdate(index: number, newValue: IAnswerOption) {
    let updatedAnswerOptions = [...props.value.answerOptions];
    updatedAnswerOptions[index].text = newValue.text;
    props.onChange({ ...props.value, answerOptions: updatedAnswerOptions });
  }

  function handleSelectChange(identifier: string) {
    let updatedAnswerOptions: IAnswerOption[];

    if (props.value.type === "single") {
      updatedAnswerOptions = props.value.answerOptions.map(
        (option: IAnswerOption) => {
          if (option.id === identifier) {
            return { ...option, selected: true };
          }
          return { ...option, selected: false };
        }
      );
    } else {
      updatedAnswerOptions = props.value.answerOptions.map(
        (option: IAnswerOption) => {
          if (option.id === identifier) {
            return { ...option, selected: !option.selected };
          }
          return option;
        }
      );
    }

    props.onChange({ ...props.value, answerOptions: updatedAnswerOptions });
  }

  function handleDelete(index: number) {
    let updatedAnswerOptions: IAnswerOption[] = [...props.value.answerOptions];
    updatedAnswerOptions.splice(index, 1);
    props.onChange({ ...props.value, answerOptions: updatedAnswerOptions });
  }

  return (
    <Container>
      <div className="options-header">
        <TypeSelector
          type={props.value.type}
          setType={(newType) => handleTypeChange(newType)}
        />
        <div className="points">
          <span>Pontos</span>
          <input
            type="number"
            value={props.value.points > 0 ? props.value.points : ""}
            onChange={(event) =>
              props.onChange({
                ...props.value,
                points: Number(event.target.value),
              })
            }
          />
        </div>
      </div>
      <input
        type="text"
        className="question-input"
        placeholder="Enunciado / Pergunta"
        value={props.value.description}
        onChange={(event) => handleDescriptionChange(event.target.value)}
      />
      <div className="answer-options">
        {props.value.answerOptions &&
          props.value.answerOptions.length > 0 &&
          props.value.answerOptions.map((answerOption, index) => (
            <AnswerOption
              key={index}
              type={props.value.type}
              value={answerOption}
              onChange={(newValue) => handleAnswerOptionUpdate(index, newValue)}
              selected={answerOption.selected}
              onSelectChange={() => handleSelectChange(answerOption.id)}
              onDelete={() => handleDelete(index)}
            />
          ))}
      </div>
      <button
        className="add-answer-option"
        onClick={() => handleAddAnswerOption()}
      >
        <ImPlus />
        Adicionar resposta
      </button>
    </Container>
  );
};

export default ManageQuestion;
