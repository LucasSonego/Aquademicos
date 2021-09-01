import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
    padding: 10px;
    background: linear-gradient(120deg, #006bff, #0059d4);
  }
`;
