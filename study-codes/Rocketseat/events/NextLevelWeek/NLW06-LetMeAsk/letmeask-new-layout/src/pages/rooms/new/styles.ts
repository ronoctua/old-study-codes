import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  main {
    display: flex;
    justify-content: center;

    padding: 40px 0;
    gap: 20px;

    .content {
      display: flex;
      flex-direction: column;

      max-width: 900px;
      gap: 20px;

      button {
        gap: 10px;
      }
    }
  }
`;
