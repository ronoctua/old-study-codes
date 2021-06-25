import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  background-color: ${(props) => props.theme.colorsOne.bgOne};

  #top-bar {
    height: 40px;
  }

  #content-after-top-bar {
    display: flex;
    flex-direction: row;
    flex: 1;
  }

  #main {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 80px;
  }

  #sidebar {
    display: flex;
    flex-direction: column;

    z-index: 9999;
    width: 200px;
    height: 100%;

    border-left: 1px solid ${(props) => props.theme.colorsOne.borderOne};
  }

  #sidebar.hide,
  .bottom-bar-sidebar-button.hide {
    display: none;
  }

  #target-content {
    flex: 1;
    align-items: stretch;

    width: 100%;
  }

  #editor {
    display: flex;
    flex-direction: column;
    flex: 1;

    width: 100%;
    height: 100%;
  }

  #bottom-bar,
  #navigation {
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%;
    height: 44px;
  }

  #note-bar,
  #navigation-menu {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    flex: 1;

    width: 100%;
    height: 100%;
  }

  #save-button {
    display: flex;

    width: 28px;
    height: 100%;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0;

      svg {
        font-size: 18px;
      }
    }
  }

  #console {
    display: flex;
    flex-direction: row;
    flex: 1;

    height: 100%;
  }

  #user-list {
    display: flex;
    flex-direction: row;

    max-width: 130px;
    min-width: 44px;
    height: 100%;

    overflow: auto;
  }

  #target-list {
    flex: 1;
    width: 100%;
    min-height: 80px;
    overflow: auto;
  }

  #target-info {
    width: 100%;
    height: 48px;
    overflow: auto;
  }

  .sidebar-button {
    width: 14px;
    height: 100%;

    button {
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border: 0;
      border-radius: 0;

      color: ${(props) => props.theme.colorsFour.linkOne};
      background-color: ${(props) => props.theme.colorsFour.bgTwo};

      svg {
        vertical-align: -1px;
      }
    }
  }

  @media (max-width: 520px) {
    #user-list {
      display: none;
    }
  }

  @media (max-width: 472px) {
    #bottom-bar {
      height: 100px;
    }

    #navigation {
      height: 50px;
    }
  }

  @media (max-width: 200px) {
    padding-bottom: 8px;
  }
`;
