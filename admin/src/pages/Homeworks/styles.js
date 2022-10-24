import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .new-homework {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    background: #f7f7f7;
    border: 3px dashed #bbb;
    border-radius: 5px;
    font-weight: bold;
    font-size: 18px;
    color: #555;
    cursor: pointer;

    svg {
      margin: 2px 20px 0 0;
    }

    :hover {
      background: #eee;
    }
  }
`;

export const Page = styled.div``;
