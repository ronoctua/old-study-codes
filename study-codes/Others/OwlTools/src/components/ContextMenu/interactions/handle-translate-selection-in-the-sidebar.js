const handleTranslateSelectionInTheSidebar = () => {
  browser.sidebarAction.open();

  browser.tabs.executeScript({
    file:
      '../../../src/components/ContextMenu/injections/translate-selection-sidebar-injection.js',
  });

  function openTranslatorInTheSidebar() {
    browser.tabs
      .query({
        currentWindow: true,
        active: true,
      })
      .then((theTabs) => {
        browser.tabs.sendMessage(theTabs[0].id, '').then((response) => {
          var theText = response.response;

          browser.storage.sync.get().then((data) => {
            var translatorUrl = data.owlTools.translator.translatingUrl;
            var newTranslatorUrl = translatorUrl + theText;

            browser.sidebarAction.setPanel({ panel: `${newTranslatorUrl}` });
          });
        });
      });
  }

  openTranslatorInTheSidebar();

  //Temporary solution to work on the user's first click. (FIXME)
  setTimeout(() => {
    openTranslatorInTheSidebar();
  }, 1000);
};

export default handleTranslateSelectionInTheSidebar;
