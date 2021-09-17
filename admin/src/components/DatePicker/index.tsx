import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBr from "date-fns/locale/pt-BR";

import { Container } from "./styles";

registerLocale("pt-BR", ptBr);

interface Props {
  onChange?: (value: any) => void;
  defaultValue?: string;
}

const DatePicker: React.FC<Props> = (props) => {
  return (
    <Container>
      <ReactDatePicker
        fixedHeight
        inline
        locale="pt-BR"
        onSelect={(value) => (props.onChange ? props.onChange(value) : {})}
        onChange={() => {}}
        selected={props.defaultValue ? new Date(props.defaultValue) : undefined}
      />
    </Container>
  );
};

export default DatePicker;
