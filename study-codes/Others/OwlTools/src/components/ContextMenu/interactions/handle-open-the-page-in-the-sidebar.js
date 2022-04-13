const handleOpenThePageInTheSidebar = () => {
  browser.sidebarAction.open();
  browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
    browser.sidebarAction.setPanel({ panel: tabs[0].url });
  });
};

export default handleOpenThePageInTheSidebar;
