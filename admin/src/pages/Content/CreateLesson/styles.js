import styled from "styled-components";

export const Container = styled.div`
  .button {
    margin-top: 15px;
    box-sizing: border-box;
    padding: 10px;
    background-color: #eee;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;

    .inline-svg {
      height: 18px;
      width: 18px;
      fill: #777;
    }

    .btn-span {
      margin-left: 10px;
      margin-top: 1px;
      color: #777;
      font-weight: bold;
    }

    @media (min-width: 751px) {
      transition: 0.2s background-color;
      &:hover {
        background-color: #e3e3e3;
      }
    }
  }

  .warning {
    margin-top: 5px;
    color: #e74c3c;
    font-size: 14px;
    margin: 5px 0;
    min-height: 22px;
  }

  .create-lesson-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 18px;
    outline: none;
    border: none;
    cursor: pointer;
    background: #3389ff;
    color: #fff;
    padding: 10px;
    border-radius: 6px;
    width: 100%;

    svg {
      margin-left: 15px;
      height: 15px;
      width: 15px;
    }

    :disabled {
      cursor: default;
    }
  }
`;
