import styled, { css } from "styled-components";

export const Container = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: fixed;
  z-index: 999;

  .navigation {
    display: flex;
    background: #f6f6f6;
    margin: 10px;
    padding: 10px;
    border-radius: 14px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 1px #3338;
  }

  // MOBILE
  @media (max-width: 750px) {
    bottom: 0;
    width: 100%;
    .navigation {
      width: 100%;
      justify-content: space-between;
    }

    .disconnect {
      display: none;
    }
  }

  // DESKTOP
  @media (min-width: 751px) {
    height: 100%;
    .navigation {
      flex-direction: column;
      width: 75px;

      transition: 0.2s ease-in-out width;
      &:hover {
        width: 250px;
      }
    }
    .disconnect {
      display: flex;
      margin-top: auto;
      margin-bottom: 0;
      cursor: pointer;
    }
  }
`;

export const Tab = styled.div`
  padding: 8px;
  height: 55px;
  display: flex;
  align-items: center;
  border-radius: 10px;

  .svg-wrapper {
    width: 30px;
    height: 30px;
  }
  svg {
    height: auto;
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    color: #555;
  }

  .inline-svg {
    fill: #555;
  }

  .label {
    color: #777;
    font-size: 16px;
  }

  ${(props) =>
    props.selected &&
    css`
      background-color: #006bff;

      svg {
        color: #fff;
      }

      .inline-svg {
        fill: #fff;
      }

      .label {
        color: #fff;
      }
    `}

  // MOBILE
  @media (max-width: 750px) {
    justify-content: center;
    width: 55px;
    .label {
      display: none;
    }
  }

  // DESKTOP
  @media (min-width: 751px) {
    overflow: hidden;
    width: 100%;
    align-items: center;
    justify-content: baseline;
    margin-bottom: 10px;

    svg {
      margin: 0 20px 0 5px;
    }

    ${(props) =>
      !props.selected &&
      css`
        &:hover {
          background-color: #ebebeb;
        }
      `}
  }
`;
