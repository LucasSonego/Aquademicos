import styled, { css } from "styled-components";

export const Container = styled.li`
  margin-top: 5px;
  background: #f6f6f6;
  border-radius: 5px;
  padding: 10px;

  ${(props) =>
    !props.expanded
      ? css`
          cursor: pointer;
        `
      : css`
          border: 1px solid #ccc;
        `}

  p {
    margin: 0;
  }

  span {
    color: #777;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
      margin: 0;
    }

    button {
      background: none;
      outline: none;
      border: none;
      padding: 0 5px 3px 5px;
      cursor: pointer;

      svg {
        height: 16px;
        width: 16px;
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

  .forms {
    @media (min-width: 951px) {
      display: flex;
    }

    .form {
      width: 100%;
    }
  }

  .form {
    .field {
      margin-top: 8px;

      .label {
        margin-left: 10px;
      }
    }

    .error {
      color: #e74c3c;
      min-height: 20px;
      font-size: 14px;
      margin: 5px 0;
    }

    button {
      width: 100%;
    }
  }

  .student-password {
    @media (max-width: 950px) {
      margin-top: 25px;
    }
    @media (min-width: 951px) {
      margin-left: 25px;
    }
  }

  .update-school-class {
    margin-top: 20px;
  }

  .form,
  .update-school-class {
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

      :disabled {
        background: #006bffaa;
        cursor: default;
      }
    }
  }

  .school-class-selection {
    @media (min-width: 951px) {
      display: flex;
      align-items: center;

      button {
        width: 300px;
        height: 36px;
        margin-left: 10px;
      }
    }

    @media (max-width: 950px) {
      button {
        margin-top: 10px;
        width: 100%;
      }
    }
  }
`;
