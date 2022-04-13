const handleSidebarInteractions = () => {
  document.querySelector('#sidebar').onclick = () => {
    browser.sidebarAction.open();
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
      browser.sidebarAction.setPanel({ panel: tabs[0].url });

      close();
    });
  };

  document.querySelector('#rain').onclick = () => {
    browser.sidebarAction.open();
    browser.sidebarAction.setPanel({
      panel: '../../../../src/pages/AmbientSounds/index.html',
    });

    close();
  };

  document.querySelector('#icons').onclick = () => {
    browser.sidebarAction.open();
    browser.sidebarAction.setPanel({
      panel: '../../../../src/pages/Icons/index.html',
    });

    close();
  };

  document.querySelector('#notes').onclick = () => {
    browser.sidebarAction.open();
    browser.sidebarAction.setPanel({
      panel: '../../../../src/pages/Notes/index.html',
    });

    close();
  };
};

export default handleSidebarInteractions;
