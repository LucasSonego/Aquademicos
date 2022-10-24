import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  background-color: #f6f6f6;
  margin-top: 15px;
  border-radius: 12px;

  .container-link {
    display: flex;
    cursor: pointer;
    width: 100%;
  }

  .public,
  .public-at {
    width: 100%;
    max-width: 150px;
    padding: 20px;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .rounded-left {
    border-radius: 12px 0 0 12px;
  }

  .public {
    h4 {
      margin: 0;
      font-size: 16px;
    }
  }

  .public-at {
    h4 {
      margin: 0;
      font-size: 13px;
      white-space: nowrap;
    }
  }

  .dates-container {
    display: flex;
  }

  .vr {
    width: 1px;
    margin: 10px 0;
  }

  .blue-bg {
    background-color: #3389ff;
    color: #fff;

    .vr {
      background-color: #fff7;
    }
  }

  .light-gray-bg {
    background-color: #e3e3e3;
    color: #555;

    .vr {
      background-color: #c1c1c1;
    }
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
