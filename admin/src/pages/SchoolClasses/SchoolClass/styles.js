import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  margin-bottom: 10px;

  padding: 20px;
  border-radius: 10px;

  .headers {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .student-amount,
    .name {
      margin: 0;
    }

    .expand-btn {
      height: 40px;
      width: 40px;
      padding: 0;
      cursor: pointer;
      border: none;
      outline: none;
      background: none;

      svg {
        height: 20px;
        width: 20px;
        transition: 0.5s;
        color: #555;
      }

      @media (min-width: 750px) {
        :hover {
          svg {
            transform: rotate(10deg);
          }
        }
      }
    }

    .students {
      display: flex;
      button {
        border: none;
        outline: none;
        font-family: inherit;
        border-radius: 3px;
        margin-left: 10px;
        background: #eee;
        cursor: pointer;
        color: #444;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 10px 0 0 0;
  }

  .student {
    margin-top: 5px;
    background: #f6f6f6;
    border-radius: 5px;
    padding: 10px;

    p {
      margin: 0;
    }

    span {
      color: #777;
    }
  }

  .controls {
    margin-top: 15px;

    .label {
      color: #777;
      position: relative;
      top: 10px;
      margin-left: 10px;
    }

    .buttons {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;

      button {
        border: none;
        outline: none;
        font-family: inherit;
        font-size: 15px;
        font-weight: bold;
        color: #fff;
        height: 36px;
        width: 200px;
        border-radius: 5px;
        cursor: pointer;
      }

      .update {
        background: #006bff;
        margin-right: 10px;

        :disabled {
          background: #006bffaa;
          cursor: default;
        }
      }

      .delete {
        background: #e55039;
      }

      .confirm {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e59839;
        svg {
          margin-right: 5px;
          margin-bottom: 2px;
          height: 16px;
          width: 16px;
        }
      }
    }
  }
`;
