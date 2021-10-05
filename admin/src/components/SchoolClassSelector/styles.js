import styled from "styled-components";

export const Container = styled.div`
  .dropdown-wrapper-div {
    display: flex;
    align-items: center;

    .dropdown {
      margin-top: 2px;
      border: none !important;
      padding-left: 10px;
      box-shadow: none !important;

      .default and .text {
        font-family: inherit !important;
        font-weight: 500 !important;
        color: #555 !important;
        font-size: 16px;
      }
      .text {
        font-family: inherit !important;
        font-weight: 500 !important;
        color: #777 !important;
        font-size: 16px;
      }
    }
    svg {
      height: 22px;
      width: 22px;
      color: #777;
      margin: 0 0 0 10px;
    }
    border-bottom: 2px solid #ddd;
  }
`;
