const handleCodeInjection = () => {
  var codeToInject;

  browser.storage.sync.get().then((data) => {
    codeToInject = data.owlTools.injectionCodes.code001.codeContent;
  });

  document.querySelector('#injection').onclick = async () => {
    browser.tabs.executeScript({
      code: codeToInject,
    });

    close();
  };
};

export default handleCodeInjection;
