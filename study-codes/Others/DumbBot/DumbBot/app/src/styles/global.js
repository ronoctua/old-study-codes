import { createGlobalStyle } from 'styled-components';
import { shade } from 'polished';

import { styles } from '../temp/configurations';

export default createGlobalStyle`
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${styles.primaryColor};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${styles.secondaryColor};
    border-radius: 8px;
  }

  ::-webkit-resizer {
    color: ${styles.primaryColor};
    background-color: ${shade(0.2, styles.background)};
    border: ${styles.border};
    border-radius: 0 0 6px 0;
  }

  *,
  html,
  body,
  div#root {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body,
  div#root {
    height: 100%;
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    font-family: sans-serif;
    background: #fff0;
    color: ${styles.textColor}
  }

  h1, h2, h3, h4, a {
    color: ${styles.primaryColor};
    text-decoration: none;
  }

  h4 {
    font-size: 15px;
  }

  h5 {
    color: ${styles.secondaryColor};
  }

  h6 {
    margin-top: 8px;
    font-size: 13px;
    letter-spacing: 0.4px;
    font-weight: bold;
    color: ${shade(0.2, styles.textColor)};
  }

  p {
    margin: 6px 0;
    color: ${styles.textColor}
  }

  a:hover {
    color: ${shade(0.06, styles.primaryColor)};
  }

  [checked], [checked]:hover {
    background: ${shade(0.3, styles.primaryColor)};
    cursor: default;
  }

  button {
    min-width: 33px;
    min-height: 33px;
    margin: 8px 2px;
    padding: 8px;
    border-radius: 8px;
    border: none;
    color: ${shade(0.6, styles.primaryColor)};
    background-color: ${styles.primaryColor};
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    color: ${shade(0.64, styles.primaryColor)};
    background-color: ${shade(0.08, styles.primaryColor)};
  }

  button svg {
    font-size: 16px;
    vertical-align: middle;
  }

  textarea, input {
    background-color: ${shade(0.2, styles.background)};
    color: ${styles.primaryColor};
    margin: 2px 0;
    padding: 8px;
    border: ${styles.border};
    border-radius: 8px;
  }

  hr {
    border: 2px dotted ${shade(0.5, styles.primaryColor)};
  }

  .hide {
    display: none;
    visibility: hidden;
  }
`;
