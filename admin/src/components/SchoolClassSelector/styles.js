import styled, { css } from "styled-components";

export const Container = styled.div`
  .header {
    @media (min-width: 751px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .selected {
      display: flex;
      align-items: center;

      svg {
        margin-right: 15px;
        height: 26px;
        width: 26px;
        color: #444;
      }

      span {
        color: #555;
        font-size: 18px;
        font-family: inherit;
        font-weight: bold;
      }
    }
  }

  .compact-mode-header {
    cursor: pointer;
  }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;

    .school-class {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      color: #777;
      font-weight: 500;
      background-color: #f6f6f6;
      padding: 20px 30px;
      border-radius: 10px;
      margin-top: 10px;
      border: 1px solid #fff0;
      cursor: pointer;

      svg {
        transform: rotate(-90deg);
        height: 26px;
        width: 26px;
      }

      transition: 0.1s background-color;
      :hover {
        background-color: #006bff15;
      }
    }

    .current {
      box-sizing: border-box;
      border: 2px solid #006bff44;
      padding: 18px 28px;
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  cursor: text;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;

  svg {
    height: 18px;
    width: 18px;
    color: #777;
  }

  @media (min-width: 751px) {
    margin-left: 15px;
  }
  @media (max-width: 750px) {
    margin-top: 15px;
  }

  transition: 0.3s border;
  ${(props) =>
    props.noResults
      ? css`
          border: 2px solid #006bff55;
          svg {
            color: #e74c3c99;
          }
        `
      : props.focus
      ? css`
          border: 2px solid #006bff55;
          svg {
            color: #006bff;
          }
        `
      : css`
          border: 2px solid #ddd;
        `}
`;

export const Input = styled.input`
  margin-right: 8px;
  background: none !important;
  border: none !important;
  outline: none !important;
  width: 100%;
  font-family: inherit;
  font-weight: 500;
  font-size: 16px;

  transition: 0.3s color;

  ${(props) =>
    props.noResults
      ? css`
          color: #e74c3c99;
        `
      : props.focus
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
