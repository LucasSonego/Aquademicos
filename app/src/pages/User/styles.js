import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .section {
    box-sizing: border-box;
    background-color: #fff;

    @media (min-width: 751px) {
      padding: 30px;
      border-radius: 15px;
    }

    @media (max-width: 750px) {
      padding: 20px;
    }
  }

  .section-label {
    color: #777;
    margin-bottom: 10px;
  }

  .label {
    color: #777;
    margin-left: 10px;
    position: relative;
    top: 5px;
  }

  .user-data {
    .user,
    .email,
    .school-class {
      display: flex;

      svg {
        margin-top: 1px;
        margin-right: 10px;
        color: #555;
      }
    }

    .user {
      h2 {
        margin-top: 0;
        color: #444;
      }

      svg {
        height: 24px;
        width: 24px;
        min-height: 16px;
        min-width: 16px;
      }
      margin-bottom: 5px;
    }

    .email,
    .school-class {
      svg {
        height: 18px;
        width: 18px;
        min-height: 18px;
        min-width: 18px;
        margin-left: 2px;
      }

      span {
        font-size: 16px;
      }
      margin-bottom: 4px;
    }

    .disconnect {
      background: #7772;
      border: 2px solid #777;
      border-radius: 5px;
      outline: none;
      height: 35px;
      width: 80px;
      margin-top: 15px;
      color: #333;
      font-family: inherit;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        height: 16px;
        width: 16px;
        margin-right: 5px;
      }

      span {
        margin-top: 1px;
      }

      @media (min-width: 751px) {
        display: none;
      }
    }
  }

  .warning {
    color: #e74c3c;
    min-height: 20px;
    font-size: 14px;
    margin: 5px 0;
  }

  .update-user-data,
  .update-password {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    button {
      background: #006bff;
      height: 40px;
      width: 100%;
      font-size: 16px;
      font-family: inherit;
      font-weight: 600;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 5px;
      cursor: pointer;

      @media (min-width: 751px) {
        transition: 0.2s opacity;
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }

  .divider {
    margin: 10px 0;

    @media (max-width: 750px) {
      height: 2px;
      width: 100%;
      margin-bottom: 0;
      background: linear-gradient(
        90deg,
        #006bff10,
        #006bff,
        #006bff,
        #006bff10
      );
    }
  }

  @media (min-width: 1000px) {
    .divider {
      display: none;
    }

    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "user_data user_data"
      "update_user_data update_password";

    .user-data {
      grid-area: user_data;
    }

    .update-user-data {
      grid-area: update_user_data;

      height: 100%;
      button {
        margin-top: auto;
      }
      h3 {
        margin-bottom: 20px;
      }
    }

    .update-password {
      grid-area: update_password;
    }
  }
`;

export const Page = styled.div`
  box-sizing: border-box;
  min-height: 100vh;

  @media (min-width: 751px) {
    background: linear-gradient(120deg, #006bff, #0059d4);
    padding: 10px 20px 10px 105px;
  }

  @media (max-width: 750px) {
    padding-bottom: 95px;
  }
`;
