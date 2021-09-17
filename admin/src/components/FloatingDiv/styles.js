import styled, { css } from "styled-components";

export const Container = styled.div`
  background: #fff;
  z-index: 100;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 1px #3338;

  @media (min-width: 751px) {
    padding: 20px;
  }

  @media (max-width: 750px) {
    height: fit-content;
    max-height: 100%;
    max-width: 100%;
    top: 0px;
    left: 0px;
    padding: 10px;
  }

  .header {
    width: 100%;
    display: flex;

    h3 {
      margin: 0;
      color: #444;
    }

    button {
      margin-left: auto;
      padding: 0;
      cursor: pointer;
      background: none;
      border: none;
      outline: none;

      svg {
        height: 18px;
        width: 18px;
      }
    }
  }

  .children-wrapper {
    overflow-y: auto;
    @media (max-width: 750px) {
    }

    @media (min-width: 751px) {
      max-height: 80vh;
    }

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: #f5f5f5;
      border-radius: 2px;
      margin-left: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: #ccc;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #bbb;
    }
  }
`;

export const Wrapper = styled.div`
  ${(props) =>
    props.visible
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const BackDrop = styled.div`
  ${(props) =>
    props.visible
      ? css`
          z-index: 99
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #3332;
        `
      : css`
          display: none;
        `}
`;
