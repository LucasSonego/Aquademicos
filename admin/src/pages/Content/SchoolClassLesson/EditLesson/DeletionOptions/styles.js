import styled, { css } from "styled-components";

export const Container = styled.div`
  ${(props) =>
    props.expanded &&
    css`
      background: #f6f6f6;
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 5px 0 5px 5px;
      margin-right: 5px;
    `}

  .buttons {
    display: flex;

    button {
      padding: 8px 15px;
      width: 100%;
      outline: none;
      cursor: pointer;
      font-weight: 500;
      border-radius: 4px;
    }

    .confirm {
      margin-right: 10px;
      border: none;
      background: #555;
      color: #fff;
    }

    .cancel {
      border: 2px solid #555;
      background: #fff;
      color: #555;
    }
  }
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  text-align: start;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  cursor: pointer;
  box-sizing: border-box;

  .circle {
    height: 20px;
    width: 20px;
    min-height: 20px;
    min-width: 20px;
    border-radius: 10px;
    border: 1px solid #aaa;
    margin: 0 10px 0 5px;
    padding: 2px;
  }

  h4 {
    color: #555;
    margin: 0;
  }

  p {
    margin: 0;
    color: #777;
  }

  ${(props) =>
    props.selected &&
    css`
      border: 2px solid #999;
      padding: 9px;

      .circle {
        border: 2px solid #777;
      }

      .dot {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: #777;
      }
    `}
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  outline: none;
  box-sizing: border-box;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  svg {
    height: 18px;
    width: 18px;
  }

  ${(props) =>
    props.expanded &&
    css`
      background: #f6f6f6;
      padding: 5px 10px 2px 10px;
      border-radius: 5px 5px 0 0;
    `}
`;
