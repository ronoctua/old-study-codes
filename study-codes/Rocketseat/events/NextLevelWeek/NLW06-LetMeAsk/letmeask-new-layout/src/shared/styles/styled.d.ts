import 'styled-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface DefaultTheme {
    title: string;

    primary: string;
    secondary: string;

    background: string;

    text: string;
    secondaryText: string;

    link: string;
    linkHover: string;
    linkVisited: string;
    linkActive: string;

    buttonText: string;
    buttonBackground: string;

    border: string;
    inputBorder: string;

    focus: string;
    focusText: string;

    error: string;
    success: string;
  }
}
