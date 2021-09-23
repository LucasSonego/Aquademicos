import styled from "styled-components";

export const Container = styled.div`
  .lesson-selected {
    margin-top: 10px;
    display: flex;
    @media (min-width: 751px) {
      .right {
        margin-left: 20px;
      }
    }

    @media (max-width: 750px) {
      flex-direction: column;
    }
  }

  .left {
    width: 100%;
  }

  .lesson-header {
    margin: 0 0 4px 0;
  }

  .lesson {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 15px;
    background: #f6f6f6;
    border-radius: 10px;

    h4 {
      display: flex;
      width: 100%;
      margin: 0;
    }
    p {
      margin: 0 0 10px 0;
    }
  }

  .back {
    margin-top: 10px;
    padding: 6px 10px;
    border: 2px solid #999;
    border-radius: 6px;
    font-size: 13px;
    color: #555;
    font-weight: 500;
    cursor: pointer;
    background: #f6f6f6;
    width: fit-content;
  }

  .extra-header {
    display: none;
  }

  @media (max-width: 750px) {
    .right {
      margin-top: 10px;
    }

    .extra-header {
      display: block;
    }

    .date-picker-wrapper {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
    }
  }

  .label {
    color: #777;
    width: 211px;
    text-align: start;
  }

  .grey-warning {
    background: #eee;
    height: fit-content;
    width: fit-content;
    max-width: 212px;
    text-align: center;
    font-size: 12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  .add-lesson {
    margin-top: 10px;
    width: 100%;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    background: #3389ff;
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    padding: 10px;
  }
`;
