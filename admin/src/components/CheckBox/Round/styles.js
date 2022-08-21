import styled, { css } from "styled-components";

export const Container = styled.div`
  .round-border {
    height: 22px;
    width: 22px;
    box-sizing: border-box;
    border-radius: 11px;
    padding: 2px;
    border: 3px solid #999;
  }

  .center {
    background-color: #fff;
    height: 12px;
    width: 12px;
    border-radius: 6px;
    transition: 0.3s border-color;
    transition: 0.2s background-color;
  }

  ${(props) =>
    props.checked &&
    css`
      .round-border {
        border-color: #006bff;
      }

      .center {
        background-color: #006bff;
      }
    `}
`;
