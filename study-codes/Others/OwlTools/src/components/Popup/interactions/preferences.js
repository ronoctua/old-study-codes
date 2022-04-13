const handlePreferencesInteraction = () => {
  document.querySelector('#preferences').onclick = () => {
    browser.sidebarAction.open();
    browser.sidebarAction.setPanel({
      panel: '../../../../src/pages/Preferences/index.html',
    });

    close();
  };
};

export default handlePreferencesInteraction;
