import styled from "styled-components";

export const Container = styled.div`
  .dropdown-wrapper-div {
    display: flex;
    align-items: center;

    .dropdown {
      margin-top: 2px;
      border: none !important;
      padding-left: 10px;
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
    margin-bottom: 10px;
  }
  .input-wrapper {
    margin-bottom: 10px;
  }

  .submit-btn {
    cursor: pointer;
    margin-top: 10px;
    font-family: inherit;
    font-weight: 600;
    font-size: 18px;
    border: none;
    outline: none;
    color: #fff;
    background: #006bff;
    height: 45px;
    width: 100%;
    border-radius: 10px;

    transition: 0.3s opacity;
    @media (min-width: 801px) {
      &:hover {
        opacity: 0.9;
      }
    }
  }
`;
