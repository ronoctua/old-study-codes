const handleTranslateSelectionInNewTab = () => {
  browser.tabs.executeScript({
    file:
      '../../../src/components/ContextMenu/injections/translate-selection-new-tab-injection.js',
  });

  function openTranslatorInNewTab() {
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

            browser.tabs.create({
              url: newTranslatorUrl,
              active: true,
            });
          });
        });
      });
  }

  openTranslatorInNewTab();

  //Temporary solution to work on the user's first click. (FIXME)
  setTimeout(() => {
    openTranslatorInNewTab();
  }, 1000);
};

export default handleTranslateSelectionInNewTab;
