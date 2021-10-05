import styled from "styled-components";

export const Container = styled.li`
  margin-top: 10px;
  background-color: #eee;
  border-radius: 6px;
  padding: 10px;

  .always-visible {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .pointer {
    cursor: pointer;
  }

  h4,
  p {
    margin: 0;
  }

  .buttons {
    display: flex;
    margin-bottom: 10px;

    .select {
      font-size: 14px;
      font-weight: 500;
      border: 2px solid #006bff;
      color: #006bff;
      background: #ddebff;
      border-radius: 4px;
      padding: 4px;
      width: 100%;
      cursor: pointer;
    }

    .collapse {
      margin-left: 10px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #555;
      border: 2px solid #555;
      border-radius: 4px;
      background: #f6f6f6;
      cursor: pointer;

      svg {
        height: 18px;
        width: 20px;
      }
    }
  }

  .content-wrapper {
    margin-top: 10px;
    padding: 0 5px;
    border-radius: 5px;
    background-color: #fff;
  }

  .video-player-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;
