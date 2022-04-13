const handleTranslateThePage = (encodedPageUrl) => {
  var newTranslateThePageUrl;

  browser.storage.sync
    .get()
    .then((data) => {
      newTranslateThePageUrl =
        data.owlTools.translator.translateThePageUrl + encodedPageUrl;
    })
    .then(() => {
      browser.tabs.create({
        url: newTranslateThePageUrl,
        active: true,
      });
    });
};

export default handleTranslateThePage;
