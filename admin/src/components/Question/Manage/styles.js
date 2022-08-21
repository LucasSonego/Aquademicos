import styled from "styled-components";

export const Container = styled.div`
  .options-header {
    display: flex;
    justify-content: space-between;

    .points {
      display: flex;
      flex-direction: column;
      margin-left: 40px;
      span {
        color: #777;
        font-size: 14px;
      }
      input {
        height: 100%;
        width: 70px;
        margin-top: 2px;

        outline: none;
        border: 2px solid #ddd;
        border-radius: 8px;
        font-size: 18px;
        font-weight: 500;
        color: #777;
        text-align: center;
      }
    }

    // Hide the arrows from number input field
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
  }

  .question-input {
    margin-top: 15px;
    margin-bottom: 3px;
    border: none;
    border-bottom: 1px solid #e5e5e5;
    outline: none;
    font-size: 18px;
    color: #555;
    font-weight: 500;
    width: 100%;

    ::placeholder {
      color: #bbb;
    }
  }

  .answer-options {
    list-style: none;
    margin: none;
    padding: none;
  }

  .add-answer-option {
    display: flex;
    justify-content: center;
    margin-top: 8px;
    background: #eee;
    padding: 8px;
    font-weight: bold;
    border: none;
    outline: none;
    border-radius: 4px;
    width: 100%;
    color: #777;
    cursor: pointer;

    svg {
      margin-right: 10px;
    }
  }
`;
