import { createGlobalStyle } from 'styled-components';

const arrow = (color: string) =>
  `"data:image/svg+xml;utf8,<svg fill='${color.replace(
    /#/g,
    '%23',
  )}' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>"`;

export default createGlobalStyle`
  @font-face {
    font-family: 'OpenSans';
    font-style: normal;
    font-weight: 800;
    src: url('../assets/fonts/OpenSans/OpenSans-ExtraBold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'OpenSans';
    font-style: normal;
    font-weight: bold;
    src: url('../assets/fonts/OpenSans/OpenSans-Bold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'OpenSans';
    font-style: normal;
    font-weight: 600;
    src: url('../assets/fonts/OpenSans/OpenSans-SemiBold.ttf') format('truetype');
  }

  @font-face {
    font-family: 'OpenSans';
    font-style: normal;
    src: url('../assets/fonts/OpenSans/OpenSans-Regular.ttf') format('truetype');
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 6px;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-corner {
    background: ${(props) => props.theme.colorsOne.scrollbarTrack};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colorsOne.scrollbarThumb};
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    scrollbar-color: ${(props) =>
      props.theme.colorsOne.scrollbarThumb +
      props.theme.colorsOne.scrollbarTrack};
    scrollbar-width: thin;
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  html {
    font-size: 87.5%; // 16 * 0,875 = 14px
  }

  body,
  input,
  textarea,
  select,
  button,
  pre {
    font: normal 1rem 'Open Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  }

  body {
    color: ${(props) => props.theme.colorsOne.textOne};
    background-color: ${(props) => props.theme.colorsOne.bgOne};
  }

  textarea,
  input,
  select,
  button {
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
  }

  textarea,
  input,
  select {
    border: 1px solid ${(props) => props.theme.colorsOne.borderTwo};
    color: ${(props) => props.theme.colorsOne.textTwo};
    background-color: ${(props) => props.theme.colorsOne.bgTwo};

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: ${(props) =>
        props.theme.colorsOne.textTwo} !important;
      -webkit-box-shadow: 0 0 0 20px ${(props) =>
        props.theme.colorsOne.bgTwo} inset !important;
    }
  }

  select {
    -moz-appearance:none;
    -webkit-appearance:none;
    appearance:none;

    background: ${(props) => props.theme.colorsOne.bgTwo};
    background-image: url(${(props) => arrow(props.theme.colorsOne.textTwo)});
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: center;
    padding-right: 2rem;
  }

  a,
  a:visited {
    color: ${(props) => props.theme.colorsOne.linkOne};
    text-decoration: none;
    cursor: pointer;
  }

  button {
    border: 1px solid ${(props) => props.theme.colorsOne.borderThree};
    color: ${(props) => props.theme.colorsOne.linkThree};
    background: ${(props) => props.theme.colorsOne.bgThree};
    cursor: pointer;
  }

  a:active,
  button:active {
    filter: brightness(93%);
  }

  .hide {
    display: none;
  }
`;
