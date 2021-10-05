import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 100%;

  ${(props) =>
    !props.readOnly &&
    css`
      width: calc(100% - 30px);
      margin-left: 30px;
    `}

  .rdw-option-wrapper {
    border-radius: 6px;
  }

  .rdw-option-active {
    border: 1px solid #006bff;
  }

  p {
    font-size: 16px;
    margin-top: 1px !important;
    font-family: --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    min-height: 25px;
  }
`;
