import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import Dashboard from './pages/Dashboard';
import GlobalStyle from './styles/global';

import { styles } from './temp/configurations';

const appWindowParams = {
  title: 'DumbBot',
  show: false,
  show_in_taskbar: false,
  frame: false,
  transparent: true,
  resizable: false,
};

const createdAppWindow = nw.Window.open('index.html', appWindowParams);
const appWindow = nw.Window.get(createdAppWindow);

const appWindowMaxWidth = styles.maxWidth;
const appWindowMaxHeight = styles.maxHeight;

var trayIconFormat = 'png';
const trayIcon = styles.trayIcon;
const operationalSystem = navigator.platform.replace(/ .*/, '');

if (operationalSystem === 'Windows') {
  trayIconFormat = 'ico';
}

var appWindowDisplayed = false;
var appWindowPositioned = false;

appWindow.setMaximumSize(appWindowMaxWidth, appWindowMaxHeight);

function showAppWindow() {
  appWindow.show();
  appWindow.focus();
  appWindowDisplayed = true;
}

function hideAppWindow() {
  appWindow.hide();
  appWindowDisplayed = false;
}

function showOrHideAppWindow(x, y) {
  appWindowPositioned === false &&
    appWindow.moveTo(x - appWindowMaxWidth / 2 - 6, y);
  appWindowDisplayed === true ? hideAppWindow() : showAppWindow();
}

var appTray;

appTray = new nw.Tray({
  title: 'DumbBot',
  tooltip: 'DumbBot',
  icon: `assets/icons/icon-${trayIcon}.${trayIconFormat}`,
  alticon: `assets/icons/icon-${trayIcon}.${trayIconFormat}`,
  iconsAreTemplates: false,
  menu: new nw.Menu(),
});

appTray.on('click', (evt) => {
  showOrHideAppWindow(evt.x, evt.y);
});

setTimeout(() => {
  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyle />
      <Dashboard />
    </React.StrictMode>,
    document.getElementById('root'),
  );

  serviceWorker.unregister();
}, 1500);
