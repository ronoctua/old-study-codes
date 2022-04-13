import createContextMenu from './components/ContextMenu/context-menu-creator.js';
import createContextMenuInteractions from './components/ContextMenu/context-menu-interactions.js';
import handleOmnibox from './components/Omnibox/omnibox.js';

createContextMenu();
createContextMenuInteractions();
handleOmnibox();

browser.commands.onCommand.addListener(function (command) {
  if (command === 'open-popup') {
    browser.browserAction.openPopup();
  }
});
