import { lighten } from 'polished';
import { createGlobalStyle } from 'styled-components';

let htmlFontSize: string | null = '62.5';

typeof window !== 'undefined' &&
  (htmlFontSize = localStorage.getItem('letMeAskHtmlFontSize'));

!htmlFontSize && localStorage.setItem('letMeAskHtmlFontSize', '62.5');

export default createGlobalStyle`
  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-200.woff2') format('woff2');
    font-style: normal;
    font-weight: 200;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-200italic.woff2') format('woff2');
    font-style: italic;
    font-weight: 200;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-300.woff2') format('woff2');
    font-style: normal;
    font-weight: 300;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-300italic.woff2') format('woff2');
    font-style: italic;
    font-weight: 300;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-400.woff2') format('woff2');
    font-style: normal;
    font-weight: 400;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  }

  @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-400italic.woff2') format('woff2');
    font-style: italic;
    font-weight: 400;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  }

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-600.woff2') format('woff2');
    font-style: normal;
    font-weight: 600;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-600italic.woff2') format('woff2');
    font-style: italic;
    font-weight: 600;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-700.woff2') format('woff2');
    font-style: normal;
    font-weight: 700;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  }

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-700italic.woff2') format('woff2');
    font-style: italic;
    font-weight: 700;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-800.woff2') format('woff2');
    font-style: normal;
    font-weight: 800;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-800italic.woff2') format('woff2');
    font-style: italic;
    font-weight: 800;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-900.woff2') format('woff2');
    font-style: normal;
    font-weight: 900;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  /* @font-face {
    font-family: 'Nunito Sans';
    src: url('/fonts/nunito-sans/nunito-sans-v6-latin-900italic.woff2') format('woff2');
    font-style: italic;
    font-weight: 900;
    font-display: block; // hide texts until font is loaded
    unicode-range: U+000-5FF; // Latin glyphs
  } */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: ${htmlFontSize ? Number(htmlFontSize) : 62.5}%;
  }

  body {
    background: ${(props) => props.theme.background};
  }

  body,
  button,
  input,
  select,
  textarea {
    font-family: 'Nunito Sans', 'Avenir', 'Lato', 'Frutiger', 'Segoe UI', 'Selawik', 'Open Sans', 'Inter', 'Roboto', sans-serif;
    font-size: 1.6rem;
    font-weight: 400;

    color: ${(props) => props.theme.text};
  }

  input,
  select,
  textarea {
    background: ${(props) => lighten(0.09, props.theme.background)};
  }

  h1 {
    font-size: 3.6rem;
    font-weight: 700;

    color: ${(props) => props.theme.text};
  }

  h2 {
    font-size: 3rem;
    font-weight: 700;

    color: ${(props) => props.theme.text};
  }

  h3 {
    font-size: 2rem;
    font-weight: 700;

    color: ${(props) => props.theme.text};
  }

  h4, h5, h6, svg {
    color: ${(props) => props.theme.text};
  }

  form {
    display: flex;
  }

  input,
  select,
  textarea {
    display: flex;
    flex: 1;

    padding: 14px;
    border: 2px solid ${(props) => props.theme.inputBorder};
    font-size: 1.8rem;

    appearance: none;

    &:focus {
      box-shadow: inset 0px 0px 0px 2px ${(props) => props.theme.inputBorder};
      outline: 3px solid ${(props) => props.theme.focus};
      outline-offset: 0;
      color: ${(props) => props.theme.focusText};
    }
  }

  textarea {
    resize: vertical;
  }

  u {
    text-decoration: underline;
    text-decoration-thickness: 0.2em;
  }

  a,
  button {
    letter-spacing: 0.7px;
    cursor: pointer;
  }

  a {
    text-decoration: none;

    color: ${(props) => props.theme.link};

    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 0.2em;

      color: ${(props) => props.theme.linkHover};
    }

    &:visited {
      color: ${(props) => props.theme.linkVisited};
    }

    &:active {
      color: ${(props) => props.theme.linkActive};
    }

    &:focus {
      box-shadow: 0;
      outline: 0;

      cursor: pointer;

      text-decoration: underline;
      text-decoration-thickness: 0.25em;

      color: ${(props) => props.theme.focusText};
      background: ${(props) => props.theme.focus};
    }
  }

  .toastContent {
    display: flex;
    flex-direction: column;

    gap: 18px;

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      gap: 8px;
    }
  }
`;
