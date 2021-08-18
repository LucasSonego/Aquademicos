import styled from "styled-components";

export const Container = styled.form`
  div {
    margin-bottom: 20px;
  }

  button {
    cursor: pointer;
    margin-top: 10px;
    font-family: inherit;
    font-weight: 600;
    font-size: 18px;
    border: none;
    outline: none;
    color: #fff;
    background: #006bff;
    height: 45px;
    width: 100%;
    border-radius: 10px;

    transition: 0.3s opacity;
    @media (min-width: 801px) {
      &:hover {
        opacity: 0.9;
      }
    }
  }
`;
