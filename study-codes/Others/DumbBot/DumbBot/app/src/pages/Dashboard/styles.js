import styled, { keyframes } from 'styled-components';

import { styles } from '../../temp/configurations';

const appearEffect = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 8px;
  padding: ${styles.padding}px;
  border-radius: 16px;
  border: ${styles.border};
  background: ${styles.background};
  animation: ${appearEffect} 0.6s;
`;

export const TopLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MiddleLine = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TopLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TopCenter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const TopRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MiddleLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MiddleCenter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const MiddleRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomCenter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
