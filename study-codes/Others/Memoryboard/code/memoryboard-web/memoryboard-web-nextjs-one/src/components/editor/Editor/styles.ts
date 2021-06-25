import styled from 'styled-components';

export const EditorTopBar = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 30px;

  background-color: ${(props) => props.theme.colorsOne.bgOne};

  div {
    margin: 0 4px;
  }

  div:first-of-type {
    margin-left: 8px;
  }

  .connected,
  .connected svg {
    cursor: default;
    color: ${(props) => props.theme.colorsOne.successText};
  }

  .disconnected,
  .disconnected svg {
    cursor: default;
    color: ${(props) => props.theme.colorsOne.errorText};
  }

  #connection-status {
    flex: 1;

    button {
      justify-content: flex-end;

      font-size: 0.9rem;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    min-width: 30px;
    min-height: 30px;
    margin: 0;
    padding: 0;

    border: none;
    background: none;

    svg {
      display: flex;

      width: 24px;
      height: 24px;
      padding: 4px;

      color: ${(props) => props.theme.colorsOne.textThree};
    }

    span {
      padding: 0 4px;
    }
  }
`;

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  width: 100%;

  .pudim {
    display: flex;
    flex: 1;
    position: relative;
    height: 80vh;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;

  background-color: ${(props) => props.theme.colorsOne.bgOne};

  h1 {
    color: ${(props) => props.theme.colorsOne.textThree};
  }
`;
