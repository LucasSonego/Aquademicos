import styled, { css } from "styled-components";

export const Container = styled.div`
  .square-border {
    height: 20px;
    width: 20px;
    margin: 0 1px;
    border-radius: 5px;
    border: 3px solid #999;
    transition: 0.2s border-color;
    transition: 0.3s background-color;
  }

  svg {
    position: relative;
    top: -5px;
    left: -4px;
    height: 22px;
    width: 22px;
    color: #fff;
  }

  ${(props) =>
    props.checked &&
    css`
      .square-border {
        border-color: #006bff;
        background-color: #006bff;
      }
    `}
`;
