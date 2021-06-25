// import { useState } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import GlobalStyles from '@shared/styles/global';
import darkTheme from '@shared/styles/themes/darkTheme';
// import potatoTheme from '@shared/styles/themes/potatoTheme';

export const ThemeProvider: React.FC = ({ children }) => {
  // const [theme, setTheme] = useState(darkTheme);

  return (
    <StyledComponentsThemeProvider theme={darkTheme}>
      <GlobalStyles />
      {children}
    </StyledComponentsThemeProvider>
  );
};
