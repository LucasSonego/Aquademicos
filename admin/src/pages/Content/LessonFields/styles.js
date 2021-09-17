import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 900px;

  @media (min-width: 751px) {
    width: 70vw;
  }

  .margin-top {
    margin-top: 15px;
  }

  .label {
    color: #888;
    margin-left: 4px;
  }

  .title-label {
    position: relative;
    top: 5px;
    width: min-content;
  }

  .description-label {
    position: relative;
    top: 9px;
    padding: 0 2px;
    width: min-content;
    height: min-content;
    background-color: #fff;
  }

  .title-input,
  .description-input {
    outline: none;
    width: 100%;
    color: #555;

    transition: 0.2s border-color;
    &:focus {
      border-color: #006bff;
    }
    &::placeholder {
      color: #aaa;
    }
  }

  .title-input {
    border: none;
    border-bottom: 2px solid #999;
    border-radius: 0;
    padding: 8px;
    font-size: 18px;
    font-weight: 500;
  }

  .description-input {
    font-size: 16px;
    padding: 8px;
    width: 100%;
    height: fit-content;
    border: 1px solid #999;
    resize: none;
    min-height: 54px;
    border-radius: 4px;
  }

  .content-label {
    display: flex;
    align-items: center;
  }

  .grey-warning {
    margin-left: 5px;
    background: #eee;
    height: fit-content;
    width: fit-content;
    max-width: 212px;
    text-align: center;
    font-size: 12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 2px;
  }

  .column {
    @media (min-width: 1001px) {
      display: flex;
    }
  }

  .video-input {
    width: 100%;
  }

  .player-wrapper {
    margin-top: 5px;
    display: flex;
    max-height: 200px;
    justify-content: center;
  }

  .date-picker-wrapper {
    @media (min-width: 1001px) {
      margin-left: 15px;
    }
    @media (max-width: 1000px) {
      margin-top: 15px;
    }

    .public-at-label {
      display: block;
    }

    .grey-warning {
      padding: 0 10px;
    }

    .react-datepicker {
      margin-top: 5px;
      margin-left: 5px;
    }
  }
`;
