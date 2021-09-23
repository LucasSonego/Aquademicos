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

  .floating-div-content {
    display: flex;
    flex-direction: column;
    width: 70vw;
    max-width: 900px;
    @media (max-width: 750px) {
      width: 85vw;
    }
  }

  .tab-selector {
    width: 100%;
    display: flex;
    border-radius: 15px;
    background-color: #f6f6f6;
    .tab {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      border-radius: 15px;
      padding: 5px;
      width: 100%;
      font-weight: 500;
      color: #777;

      svg {
        margin-top: 1px;
        margin-right: 5px;
        height: 22px;
        width: 22px;
      }
    }

    .selected {
      background-color: #ddebff;
      color: #006bff;
    }
  }
`;
