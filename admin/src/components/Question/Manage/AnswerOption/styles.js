import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 36px;

  .checkbox {
    cursor: pointer;
    margin: none;
    padding: 5px 5px 5px 0;
    background: none;
    border: none;
    outline: none;
  }

  .text-input {
    width: 100%;
    border: none;
    outline: none;
    border-radius: 3px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 16px;
    color: #555;
    font-weight: 400;
    padding: 4px 8px;

    ::placeholder {
      color: #bbb;
    }

    :hover,
    :focus {
      background: #f9f9f9;
    }
  }

  .add-img,
  .delete {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    outline: none;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;

    svg {
      height: 20px;
      width: 20px;
      color: #555;
    }

    :hover {
      background: #eee;
    }
  }
`;
