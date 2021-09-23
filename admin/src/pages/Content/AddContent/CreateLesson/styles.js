import styled from "styled-components";

export const Container = styled.div`
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
