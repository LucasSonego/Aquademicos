import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .title {
    margin: 15px 0 10px 0;
    font-family: inherit;
    font-size: 22px;
    font-weight: bold;
    width: 100%;
    border: none;
    outline: none;
    border: none;
    border-bottom: 1px solid #eee;

    ::placeholder {
      color: #bbb;
    }
  }

  .add-question {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background: #f7f7f7;
    border: 3px dashed #bbb;
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
    color: #555;
    cursor: pointer;

    svg {
      margin: 2px 20px 0 0;
    }

    :hover {
      background: #eee;
    }
  }

  .question {
    padding: 15px 0;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;
      background: #eee;
      border: none;
      outline: none;
      height: 100%;

      svg {
        height: 18px;
        width: 18px;
        color: #555;
      }

      transition: 0.2s background-color;
      :hover {
        background-color: #e5e5e5;
      }

      :disabled {
        cursor: default;

        svg {
          color: #999;
        }

        :hover {
          background-color: #eee;
        }
      }
    }

    .up-down {
      display: flex;

      button {
        width: 35px;
        height: 30px;
      }

      button:first-child {
        border-radius: 5px 0 0 5px;
      }
      button:last-child {
        border-left: 1px solid #fff;
        border-radius: 0 5px 5px 0;
      }
    }

    .delete-btn {
      width: 50px;
      height: 30px;
      border-radius: 5px;

      svg {
        height: 20px;
        width: 20px;
      }
    }
  }

  .dates {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    grid-gap: 10px;
    font-size: 16px;

    .public-on,
    .deadline {
      padding: 10px;
      background: #eee;
      border-radius: 5px;
      width: 100%;
      text-align: center;
      cursor: pointer;
      :hover {
        background: #ddd;
      }
    }

    .date {
      margin-left: 6px;
      font-weight: bold;
    }
  }

  .fd-bottom {
    display: flex;
    justify-content: flex-end;

    .no-deadline-btn {
      font-family: inherit;
      border: none;
      outline: none;
      border-radius: 3px;
      padding: 4px 7px;
      cursor: pointer;
    }

    .selected {
      background: #2a87d0;
      color: #fff;
    }
  }

  .save-questions {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    font-family: inherit;
    color: #fff;
    background: #006bff;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;

    transition: 0.3s opacity;
    :hover {
      opacity: 0.8;
    }
  }
`;

export const Page = styled.div``;
