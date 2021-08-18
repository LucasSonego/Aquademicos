import styled, { css } from "styled-components";

export const Container = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: text;

  box-sizing: border-box;
  padding: 10px 0 10px 10px;

  svg {
    margin-right: 10px;
    height: 22px;
    width: 22px;
    color: #777;
    transition: 0.3s color;
  }

  transition: 0.3s border-bottom;
  ${(props) =>
    props.focus
      ? css`
          border-bottom: 2px solid #006bff;
          svg {
            color: #006bff;
          }
        `
      : css`
          border-bottom: 2px solid #ddd;
        `}
`;

export const Input = styled.input`
  background: none !important;
  border: none !important;
  outline: none !important;
  width: 100%;
  font-family: inherit;
  font-weight: 500;
  font-size: 16px;

  transition: 0.3s color;
  ${(props) =>
    props.focus
      ? css`
          color: #006bff;
        `
      : css`
          color: #555;
        `}

  ::placeholder {
    color: #bbb;
  }
`;
