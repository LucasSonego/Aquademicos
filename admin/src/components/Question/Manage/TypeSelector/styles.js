import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .label {
    color: #777;
  }

  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    outline: none;
    font-weight: 500;
    cursor: pointer;
    padding: 2px 2px 5px 0;

    :last-child {
      padding-bottom: 0;
    }
  }
`;

export const ColoredLabel = styled.span`
  color: #999;
  margin-left: 5px;
  font-size: 16px;
  transition: 0.2s color;

  ${(props) =>
    props.colored &&
    css`
      color: #006bff;
    `}
`;
