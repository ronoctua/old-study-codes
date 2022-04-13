import CreateOrCheckDefaultData from '../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateTranslatorAndPronunciation from '../../../../storage/services/CreateTranslatorAndPronunciation.js';

const translateProviderSelect = document.querySelector(
  '#translate-provider-select',
);
const translateThePageProviderSelect = document.querySelector(
  '#translate-the-page-provider-select',
);

const sourceLanguageWhenOpeningInput = document.querySelector(
  '#source-language-when-opening-the-service-input',
);
const targetLanguageWhenOpeningInput = document.querySelector(
  '#target-language-when-opening-the-service-input',
);
const sourceLanguageWhenTranslatingInput = document.querySelector(
  '#source-language-when-translating-input',
);
const targetLanguageWhenTranslatingInput = document.querySelector(
  '#target-language-when-translating-input',
);
const sourceLanguageToTranslateThePageInput = document.querySelector(
  '#source-language-to-translate-the-page-input',
);
const targetLanguageToTranslateThePageInput = document.querySelector(
  '#target-language-to-translate-the-page-input',
);

const pronunciationPopupSiteOneWhereToOpenSelect = document.querySelector(
  '#pronunciation-popup-site-one-where-to-open-select',
);
const pronunciationPopupSiteOneProtocol = document.querySelector(
  '#pronunciation-popup-site-one-protocol',
);
const pronunciationPopupSiteOneAddress = document.querySelector(
  '#pronunciation-popup-site-one-address',
);

const saveDataButton = document.querySelector('#save-data-button');

CreateOrCheckDefaultData().then(() => {
  browser.storage.sync.get().then(async (data) => {
    translateProviderSelect.value = data.owlTools.translator.translatorProvider;
    translateThePageProviderSelect.value =
      data.owlTools.translator.translateThePageProvider;

    sourceLanguageWhenOpeningInput.value =
      data.owlTools.translator.sourceLanguageWhenOpeningTheService;
    targetLanguageWhenOpeningInput.value =
      data.owlTools.translator.targetLanguageWhenOpeningTheService;
    sourceLanguageWhenTranslatingInput.value =
      data.owlTools.translator.sourceLanguageWhenTranslating;
    targetLanguageWhenTranslatingInput.value =
      data.owlTools.translator.targetLanguageWhenTranslating;
    sourceLanguageToTranslateThePageInput.value =
      data.owlTools.translator.sourceLanguageToTranslateThePage;
    targetLanguageToTranslateThePageInput.value =
      data.owlTools.translator.targetLanguageToTranslateThePage;

    pronunciationPopupSiteOneWhereToOpenSelect.value =
      data.owlTools.pronunciation.popupSiteOne.whereToOpen;
    pronunciationPopupSiteOneProtocol.value =
      data.owlTools.pronunciation.popupSiteOne.protocol;
    pronunciationPopupSiteOneAddress.value =
      data.owlTools.pronunciation.popupSiteOne.address;
  });
});

const handleSaveNewData = () => {
  CreateTranslatorAndPronunciation(
    translateProviderSelect.value,
    translateThePageProviderSelect.value,
    sourceLanguageWhenOpeningInput.value,
    targetLanguageWhenOpeningInput.value,
    sourceLanguageWhenTranslatingInput.value,
    targetLanguageWhenTranslatingInput.value,
    sourceLanguageToTranslateThePageInput.value,
    targetLanguageToTranslateThePageInput.value,
    true,
    pronunciationPopupSiteOneWhereToOpenSelect.value,
    '🗣',
    'Pronunciation 1',
    pronunciationPopupSiteOneProtocol.value,
    pronunciationPopupSiteOneAddress.value,
  );
};

saveDataButton.addEventListener('click', handleSaveNewData);
