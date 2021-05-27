import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  user-select: none;
  margin: 30px;

  img {
    height: 40vmin;
    pointer-events: none;
    user-select: none;
    animation: ${spin} infinite 20s linear;
  }
`;
