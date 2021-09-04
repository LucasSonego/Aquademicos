import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  .deleted {
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: inherit;
      border: none;
      outline: none;
      color: #555;
      font-weight: bold;
      cursor: pointer;

      svg {
        height: 16px;
        width: 16px;
        margin: 0 5px 1px 0;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .show-deleted {
      background-color: #eee;
      margin-left: auto;

      padding: 8px;
      border-radius: 4px;

      @media (min-width: 751px) {
        transition: 0.2s background-color;
        :hover {
          background-color: #fff;
        }
      }
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
    padding: 10px;
    padding-bottom: 95px;
    background: linear-gradient(120deg, #006bff, #0059d4);
  }
`;
