import styled from "styled-components";

export const Container = styled.div`
  .warning {
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
