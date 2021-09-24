import styled, { css } from "styled-components";

export const Container = styled.div`
  ${(props) =>
    props.isPublic
      ? css`
          background: linear-gradient(120deg, #006bff, #00c2ff);
          .icon {
            background: linear-gradient(190deg, #fff8, #fff2);

            svg {
              margin-left: 3px;
              width: 55px;
              height: auto;
            }
          }
        `
      : css`
          background: linear-gradient(120deg, #999, #c0c0c0);

          .icon {
            background: linear-gradient(190deg, #8e8e8e, #535252);

            svg {
              width: 40px;
              height: auto;
            }
          }
        `}

  display: flex;
  margin-top: 20px;
  border-radius: 10px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    min-height: 80px;
    border-radius: 10px;

    svg {
      color: #fff;
    }
  }
  .text {
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
      margin: 0;
      color: #fff;
      font-weight: 500;
      font-family: inherit;
    }
    p {
      color: #eee;
      font-size: 16px;
    }
  }
`;
