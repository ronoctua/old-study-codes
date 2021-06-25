import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;
  min-height: 40px;

  color: ${(props) => props.theme.colorsSix.textTwo};
  background-color: ${(props) => props.theme.colorsSix.bgThree};

  align-items: center;

  font-size: 0.9rem;

  button {
    height: 100%;
    padding: 0 10px;

    border: none;
    border-radius: 0;

    color: ${(props) => props.theme.colorsSix.textThree};
    background: #f000;
  }

  #main-data {
    flex: 1;

    height: 100%;

    button {
      color: ${(props) => props.theme.colorsSix.textThree};
    }

    button:hover {
      background: ${(props) => props.theme.colorsSix.bgOne};
    }

    button.current,
    button.current:hover {
      color: ${(props) => props.theme.colorsSix.textOne};
      background: ${(props) => props.theme.colorsSix.bgTwo};
      cursor: default;
    }
  }

  #current-note {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    height: 100%;

    padding: 0 8px 0 0;
    margin: 0;

    b {
      color: ${(props) => props.theme.colorsSix.textOne};
    }
  }

  #user-data {
    height: 100%;

    p {
      padding-right: 8px;
    }
  }
`;
