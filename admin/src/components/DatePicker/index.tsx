import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBr from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBr);

interface Props {
  onChange?: (value: any) => void;
}

const DatePicker: React.FC<Props> = (props) => {
  return (
    <ReactDatePicker
      fixedHeight
      inline
      locale="pt-BR"
      onChange={(value) => (props.onChange ? props.onChange(value) : {})}
    />
  );
};

export default DatePicker;
