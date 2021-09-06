import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  min-height: 20px;
  height: max-content;
  width: 100%;
  padding: 20px;

  ${props =>
    props.type === "success" &&
    css`
      background: linear-gradient(120deg, #00adb5, #0097b5);
    `}
  ${props =>
    props.type === "error" &&
    css`
      background: linear-gradient(120deg, #e7673c, #e74c3c);
    `}

  span {
    font-family: inherit;
    color: #fff;
    text-align: center;
  }
`;
