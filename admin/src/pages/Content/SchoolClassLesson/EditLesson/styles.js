import styled, { css } from "styled-components";

export const Container = styled.div`
  @media (max-width: 750px) {
    .floating-div-content {
      width: 85vw;
    }
  }

  .submit {
    margin-top: 5px;
    width: 100%;
    background: #006bff;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    color: #fff;
    font-weight: 500;
    padding: 8px;

    :disabled {
      background: #006bffaa;
      cursor: default;
    }
  }
`;

export const FlexibleDiv = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    color: #777;
  }

  ${(props) =>
    props.expanded &&
    css`
      flex-direction: column-reverse;
      align-items: start;

      h3 {
        margin-top: 10px;
      }
    `}
`;
