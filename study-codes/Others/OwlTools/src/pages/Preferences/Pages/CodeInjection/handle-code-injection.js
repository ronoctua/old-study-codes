import CreateOrCheckDefaultData from '../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateCodeInjection from '../../../../storage/services/CreateCodeInjection.js';

const codeInjectionTextarea = document.querySelector(
  '#code-injection-textarea',
);

const codeInjectionSaveButton = document.querySelector(
  '#code-injection-save-button',
);

CreateOrCheckDefaultData().then(() => {
  browser.storage.sync.get().then(async (data) => {
    codeInjectionTextarea.value =
      data.owlTools.injectionCodes.code001.codeContent;
  });
});

const handleSaveNewData = () => {
  CreateCodeInjection({
    code001: {
      title: 'Code 01',
      number: 1,
      icon: '💉',
      codeContent: codeInjectionTextarea.value,
    },
  });
};

codeInjectionSaveButton.addEventListener('click', handleSaveNewData);
