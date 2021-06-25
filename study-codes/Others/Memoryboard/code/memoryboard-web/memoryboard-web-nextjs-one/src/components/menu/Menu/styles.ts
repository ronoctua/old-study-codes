import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${(props) => props.theme.colorsFour.bgOne};

  #menu {
    margin: 0 4px;
  }

  div,
  nav,
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
  }

  div {
    height: 100%;
    min-height: 30px;
  }

  nav {
    justify-content: space-between;
    flex: 1;

    a:first-child {
      margin-left: 4px;
    }

    a {
      justify-content: center;

      width: 28px;
      height: 28px;
      margin-right: 4px;
      border-radius: 50%;
      font-size: 1.2rem;

      color: ${(props) => props.theme.colorsFour.linkOne};
      background-color: ${(props) => props.theme.colorsFour.bgTwo};
    }
  }
`;
