const handleCodeInjection = () => {
  var codeToInject;

  browser.storage.sync.get().then((data) => {
    codeToInject = data.owlTools.injectionCodes.code001.codeContent;
  });

  setTimeout(() => {
    browser.tabs.executeScript({
      code: codeToInject,
    });
  }, 200);
};

export default handleCodeInjection;
