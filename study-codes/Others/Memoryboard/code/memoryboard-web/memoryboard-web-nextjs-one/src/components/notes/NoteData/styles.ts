import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  background-color: ${(props) => props.theme.colorsThree.bgOne};

  div,
  ul {
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colorsThree.bgTwo};
  }

  ul {
    list-style-type: none;
  }

  ul ul {
    margin: 0 0 0 10px;
    padding: 0px 6px;
    border-left: 2px dotted ${(props) => props.theme.colorsThree.borderTwo};
  }

  div {
    margin: 6px 4px 8px 4px;
  }

  div div {
    margin: 3px 4px;
  }

  li {
    padding: 0 4px;
  }

  h1 {
    margin: 0 4px;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colorsThree.titleOne};
  }

  h2,
  h2 a {
    color: ${(props) => props.theme.colorsThree.titleTwo};
    font-size: 0.9rem;
  }

  a,
  a:visited {
    font-size: 0.9rem;
    letter-spacing: 0.02rem;
    color: ${(props) => props.theme.colorsThree.linkOne};
  }

  span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colorsThree.textOne};
  }

  .highlight {
    padding-right: 8px;
    color: ${(props) => props.theme.colorsThree.textTwo};
  }
`;
