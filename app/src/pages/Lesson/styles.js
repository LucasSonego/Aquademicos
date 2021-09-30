import styled from "styled-components";
import background from "../../assets/waves_background.svg";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 751px) {
    min-height: calc(100vh - 20px);
  }
  @media (max-width: 750px) {
    min-height: calc(100vh - 105px);
  }

  .headers {
    h3 {
      color: #fff;
      font-size: 22px;
      margin: 0;
    }
    p {
      color: #fff;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  .content {
    background-color: #fff;
    height: min-content;
    @media (min-width: 751px) {
      padding: 20px;
      border-radius: 15px;
    }
    @media (max-width: 750px) {
      padding: 10px;
      border-radius: 10px;
    }
  }

  .md-wrapper {
    margin-bottom: 20px;
  }

  .video-ended {
    @media (min-width: 851px) {
      height: 70vh;
    }
    @media (max-width: 850px) {
      height: 35vh;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      font-size: 16px;
      color: #555;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      outline: none;
      cursor: pointer;
      border-radius: 6px;
      padding: 10px 20px;
      color: #555;
      font-weight: 500;
      font-size: 16px;

      svg {
        margin-right: 10px;
        height: 22px;
        width: 22px;
      }
    }
  }
`;

export const Page = styled.div`
  background-image: url(${background});
  background-size: cover;
`;
