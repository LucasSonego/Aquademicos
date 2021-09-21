import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  background-color: #f6f6f6;
  margin-top: 15px;
  border-radius: 12px;

  .public,
  .public-at {
    border-radius: 12px 0 0 12px;
    width: 100%;
    max-width: 150px;
    padding: 20px;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .public {
    background-color: #3389ff;
    color: #fff;

    h4 {
      margin: 0;
      font-size: 18px;
    }
  }

  .public-at {
    background-color: #e3e3e3;
    color: #555;
    font-size: 16px;
    text-align: center;
    font-weight: 500;
  }

  .text {
    padding: 20px;
    width: 100%;
    cursor: pointer;

    h3 {
      margin: 0 0 5px 0;
      color: #555;
    }
    p {
      font-weight: 500;
      color: #777;
    }
  }
`;
