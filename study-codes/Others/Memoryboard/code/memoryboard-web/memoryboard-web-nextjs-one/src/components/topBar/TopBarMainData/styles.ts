import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 100%;

  p {
    display: flex;
    align-items: center;

    height: 100%;
    padding: 0 8px;
    border-left: 2px solid ${(props) => props.theme.colorsSix.bgOne};
  }
`;
