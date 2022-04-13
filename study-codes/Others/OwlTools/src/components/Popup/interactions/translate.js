const handleTranslateInteractions = () => {
  var translatorProvider = '';
  var translatorUrl = '';
  var translateThePageUrl = '';

  browser.storage.sync.get().then((data) => {
    translatorProvider = data.owlTools.translator.translatorProvider;
    translatorUrl = data.owlTools.translator.openingUrl;
    translateThePageUrl = data.owlTools.translator.translateThePageUrl;
  });

  document.querySelector('#translate-popup').onclick = () => {
    // if (translatorProvider === 'deepl-translate') {
    //   document.location.replace(translatorUrl);
    // } else {
    //   let popupIframe = document.createElement('iframe');

    //   document.querySelector('#main-content').style.display = 'none';
    //   popupIframe.src = translatorUrl;
    //   document.body.appendChild(popupIframe);
    // }
  };

  document.querySelector('#translate-sidebar').onclick = () => {
    browser.sidebarAction.open();
    browser.sidebarAction.setPanel({
      panel: translatorUrl,
    });

    close();
  };

  document.querySelector('#translate-page').onclick = () => {
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
      let encodedPageUrl = encodeURIComponent(tabs[0].url);
      let newTranslateThePageUrl = translateThePageUrl + encodedPageUrl;

      browser.tabs.create({
        url: newTranslateThePageUrl,
        active: true,
      });

      close();
    });
  };

  document.querySelector('#translate-tab').onclick = () => {
    browser.tabs.create({
      url: translatorUrl,
    });

    close();
  };
};

export default handleTranslateInteractions;
