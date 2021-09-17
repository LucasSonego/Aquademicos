import styled from "styled-components";

export const Container = styled.div`
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  svg {
    animation: rotation 0.6s infinite linear;
  }
`;
