import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  height: 100%;
  min-height: 30px;

  background-color: ${(props) => props.theme.colorsSix.bgOne};

  #control-and-console-container {
    display: flex;
    flex-direction: row;
    flex: 1;

    height: 100%;
  }

  #control-container {
    flex-direction: row;

    width: 16px;
    height: 100%;

    color: ${(props) => props.theme.colorsSix.textOne};
    background-color: ${(props) => props.theme.colorsSix.bgOne};
  }

  #console-container {
    flex: 1;
    min-width: 140px;

    pre {
      width: 100%;
      height: 100%;
      padding: 0 4px;
      font-size: 0.75rem;

      overflow: auto;
      resize: none;
      ::-webkit-resizer {
        display: none;
      }

      color: ${(props) => props.theme.colorsSix.textOne};
      background-color: ${(props) => props.theme.colorsSix.bgThree};

      p {
        max-width: 50px;
      }

      span {
        font-size: 0.7rem;
        padding-right: 3px;

        color: ${(props) => props.theme.colorsSix.textThree};
      }
    }
  }

  #typing-container {
    display: flex;
    flex-direction: row;

    max-width: 130px;
    min-width: 116px;
    height: 100%;

    color: ${(props) => props.theme.colorsSix.textOne};
    background-color: ${(props) => props.theme.colorsSix.bgOne};

    textarea {
      display: flex;
      flex: 1;

      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0 6px;
      border: 0;
      font-size: 0.75rem;

      border-radius: 0;
      resize: none;

      color: ${(props) => props.theme.colorsSix.textOne};
      background-color: ${(props) => props.theme.colorsSix.bgThree};
    }
  }

  #control-container,
  #typing-container {
    button {
      display: flex;
      justify-content: center;
      align-items: center;

      min-width: 16px;
      height: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 0.6rem;

      color: ${(props) => props.theme.colorsSix.textOne};
      background-color: ${(props) => props.theme.colorsSix.bgOne};
    }
  }

  @media (max-width: 472px) {
    flex-direction: column;

    #typing-container {
      max-width: 100%;
      border-top: 1px solid ${(props) => props.theme.colorsSix.borderOne};
    }

    #console-container {
      min-width: 80px;
    }
  }
`;
