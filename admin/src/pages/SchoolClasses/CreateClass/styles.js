import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 10px;
  .expand {
    background-color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    height: 30px;
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

    span {
      margin-left: 10px;
      margin-top: 1px;
      color: #777;
      font-weight: bold;
    }

    @media (min-width: 751px) {
      transition: 0.2s background-color;
      &:hover {
        background-color: #f6f6f6;
      }
    }
  }

  .form {
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;

    .header {
      display: flex;
      justify-content: space-between;
      h3 {
        color: #555;
        font-weight: bold;
        margin: 0;
      }

      button {
        background: none;
        outline: none;
        border: none;
        padding: 0 5px 3px 5px;
        cursor: pointer;

        svg {
          height: 20px;
          width: 20px;
        }
        @media (min-width: 751px) {
          svg {
            transition: 0.3s color;
          }
          &:hover {
            svg {
              color: #555;
            }
          }
        }
      }
    }

    .warning {
      margin-top: 5px;
      color: #e74c3c;
      font-size: 14px;
      margin: 5px 0;
    }

    .row {
      button {
        height: 34px;
        font-family: inherit;
        font-weight: bold;
        font-size: 14px;
        color: #fff;
        background: #006bff;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 5px;

        @media (max-width: 750px) {
          margin-top: 10px;
          width: 100%;
        }
        @media (min-width: 751px) {
          margin-left: 15px;
          width: 200px;
        }
      }

      @media (min-width: 751px) {
        display: flex;
        align-items: center;
      }
    }
  }
`;
