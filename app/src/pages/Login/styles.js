import styled from "styled-components";
import background from "../../assets/background.svg";

export const Container = styled.div`
  background-image: url(${background});
  background-size: cover;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
    color: #fff;
    box-sizing: border-box;
  }

  .divider {
    display: none;
  }

  .content {
    margin: 0;
    box-sizing: border-box;
    background: #fff;
    height: min-content;
  }

  .switch-panel {
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    font-size: 18px;
    border: none;
    outline: none;
    color: #006bff;
    background: #fff;
    border: 2px solid #006bff;
    height: 45px;
    width: 100%;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .or {
    margin: 10px 0 10px 0;
    display: flex;
    align-items: center;

    .hl {
      height: 1px;
      width: 100%;
      background-color: #ccc;
    }

    span {
      margin: 0 10px;
      font-family: inherit;
      color: #777;
    }
  }

  @media (min-width: 801px) {
    display: flex;
    align-items: center;
    justify-content: center;

    .content {
      margin-top: 10px;
      max-width: 400px;
      width: 100%;
      padding: 50px;
      border-radius: 10px;
    }

    .switch-panel {
      transition: 0.3s background-color;
      &:hover {
        background-color: #006bff33;
      }
    }
  }

  @media (max-width: 800px) {
    .header {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      width: 100%;
      height: 100%;
      padding-left: 30px;
    }

    .divider {
      display: block;
      margin-top: auto;
      svg {
        width: 100vw;
        height: auto;
        vertical-align: bottom;
      }
    }

    .content {
      padding: 5px 40px 20px 40px;
    }
  }
`;
