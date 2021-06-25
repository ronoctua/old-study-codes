import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  height: 100%;

  overflow: auto;

  background-color: ${(props) => props.theme.colorsTwo.bgOne};

  div {
    padding: 2px 0 4px 0;
  }

  ul,
  li {
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colorsTwo.bgTwo};
  }

  ul {
    margin: 4px;
    list-style-type: none;
  }

  ul ul {
    margin: 0 0 0 10px;
    padding: 4px 6px;
    border-left: 2px dotted ${(props) => props.theme.colorsTwo.borderTwo};
  }

  li {
    padding: 2px 4px 6px 4px;
  }

  h2,
  h2 a {
    color: ${(props) => props.theme.colorsTwo.titleOne};
    font-size: 0.9rem;
  }

  button {
    padding: 0;
    margin: 0;
    border: none;

    font-size: 0.9rem;
    letter-spacing: 0.02rem;
    text-align: left;

    color: ${(props) => props.theme.colorsTwo.linkOne};
    background: none;

    &.current {
      color: ${(props) => props.theme.colorsTwo.primary};
    }
  }

  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colorsTwo.textOne};
  }

  svg {
    margin-right: 2px;
  }
`;
