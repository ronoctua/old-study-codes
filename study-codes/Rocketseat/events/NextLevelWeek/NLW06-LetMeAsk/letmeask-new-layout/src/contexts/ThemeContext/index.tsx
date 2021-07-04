import { createContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import GlobalStyles from '@shared/styles/global';
import { contrast } from '@shared/styles/themes/contrast';
import { dark } from '@shared/styles/themes/dark';
import { light } from '@shared/styles/themes/light';
import { potato } from '@shared/styles/themes/potato';
import { reptilian } from '@shared/styles/themes/reptilian';
import { unicorn } from '@shared/styles/themes/unicorn';

interface IThemeChangerProps {
  changeTheme: (theme: string) => void;
  changeHtmlFontSize: (actionType: 'increase' | 'decrease') => void;
}
export const ThemeChanger = createContext({} as IThemeChangerProps);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(light);

  const changeTheme = (theme: string): void => {
    localStorage.setItem('letMeAskTheme', theme);

    theme === 'light' && setTheme(light);
    theme === 'contrast' && setTheme(contrast);
    theme === 'dark' && setTheme(dark);
    theme === 'potato' && setTheme(potato);
    theme === 'reptilian' && setTheme(reptilian);
    theme === 'unicorn' && setTheme(unicorn);
  };

  const changeHtmlFontSize = (actionType: 'increase' | 'decrease'): void => {
    let htmlFontSize = localStorage.getItem('letMeAskHtmlFontSize');

    if (!htmlFontSize) {
      htmlFontSize = '72.5';
      localStorage.setItem('letMeAskHtmlFontSize', htmlFontSize);
    } else {
      actionType === 'increase'
        ? (htmlFontSize = `${Number(htmlFontSize) + 10}`)
        : (htmlFontSize = `${Number(htmlFontSize) - 10}`);

      localStorage.setItem('letMeAskHtmlFontSize', htmlFontSize);
    }

    document.getElementsByTagName(
      'html',
    )[0].style.fontSize = `${htmlFontSize}%`;
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem('letMeAskTheme');
    const htmlFontSize = localStorage.getItem('letMeAskHtmlFontSize');

    currentTheme && changeTheme(currentTheme);

    if (htmlFontSize) {
      document.getElementsByTagName(
        'html',
      )[0].style.fontSize = `${htmlFontSize}%`;
    }
  }, []);

  return (
    <ThemeChanger.Provider value={{ changeTheme, changeHtmlFontSize }}>
      <StyledComponentsThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </StyledComponentsThemeProvider>
    </ThemeChanger.Provider>
  );
};
