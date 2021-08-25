import styled from "styled-components";

export const Container = styled.form`
  div:first-child {
    margin-bottom: 20px;
  }

  p {
    color: #e74c3c;
    min-height: 20px;
    font-size: 14px;
    margin: 5px 0;
  }

  button {
    cursor: pointer;
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
