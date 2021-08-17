import React from "react";

import { Container } from "./styles";

interface NotificationProps {
  type: "success" | "error";
  message: string;
  description?: string;
}

export default function Notification(props: NotificationProps) {
  return (
    <Container type={props.type}>
      {props.message && <span>{props.message}</span>}
      {props.description && <span>{props.description}</span>}
    </Container>
  );
}
