import styled from "styled-components";

export const Container = styled.li`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  padding: 20px;
  margin-top: 10px;

  .details {
    h3 {
      margin: 0;
    }
    p {
      margin: 5px 0 0 0;
    }
  }

  .restore {
    margin-left: 5px;
    padding: 0 20px;
    border-radius: 4px;
    svg {
      margin-bottom: 3px;
    }
  }
`;
