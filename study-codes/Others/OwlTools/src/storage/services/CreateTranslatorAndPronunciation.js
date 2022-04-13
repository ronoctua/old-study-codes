import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const CreateTranslatorAndPronunciation = async (
  newTranslatorProvider,
  newTranslateThePageProvider,
  newSourceLanguageWhenOpeningTheService,
  newTargetLanguageWhenOpeningTheService,
  newSourceLanguageWhenTranslating,
  newTargetLanguageWhenTranslating,
  newSourceLanguageToTranslateThePage,
  newTargetLanguageToTranslateThePage,
  newPronunciationSiteOneDisplay,
  newPronunciationSiteOneWhereToOpen,
  newPronunciationSiteOneIcon,
  newPronunciationSiteOneTitle,
  newPronunciationSiteOneProtocol,
  newPronunciationSiteOneAddress,
) => {
  var newOpeningUrl = '';
  var newTranslatingUrl = '';
  var newTranslateThePageUrl = '';

  switch (newTranslatorProvider) {
    case 'google-translate':
      newOpeningUrl = `https://translate.google.com/?sl=${newSourceLanguageWhenOpeningTheService}&tl=${newTargetLanguageWhenOpeningTheService}`;
      newTranslatingUrl = `https://translate.google.com/?sl=${newSourceLanguageWhenTranslating}&tl=${newTargetLanguageWhenTranslating}&text=`;
      break;
    case 'bing-translator':
      newOpeningUrl = `https://www.bing.com/translator/?from=${newSourceLanguageWhenOpeningTheService}&to=${newTargetLanguageWhenOpeningTheService}`;
      newTranslatingUrl = `https://www.bing.com/translator/?from=${newSourceLanguageWhenTranslating}&to=${newTargetLanguageWhenTranslating}&text=`;
      break;
    case 'yandex-translate':
      newOpeningUrl = `https://translate.yandex.com/?lang=${newSourceLanguageWhenOpeningTheService}-${newTargetLanguageWhenOpeningTheService}`;
      newTranslatingUrl = `https://translate.yandex.com/?lang=${newSourceLanguageWhenTranslating}-${newTargetLanguageWhenTranslating}&text=`;
      break;
    case 'deepl-translate':
      newOpeningUrl = `https://www.deepl.com/translator#${newSourceLanguageWhenOpeningTheService}/${newTargetLanguageWhenOpeningTheService}/`;
      newTranslatingUrl = `https://www.deepl.com/translator#${newSourceLanguageWhenTranslating}/${newTargetLanguageWhenTranslating}/`;
      break;
    case 'mymemory':
      newOpeningUrl = `https://mymemory.translated.net/en/${newSourceLanguageWhenOpeningTheService}/${newTargetLanguageWhenOpeningTheService}/`;
      newTranslatingUrl = `https://mymemory.translated.net/en/${newSourceLanguageWhenTranslating}/${newTargetLanguageWhenTranslating}/`;
      break;
    default:
      //
      break;
  }

  switch (newTranslateThePageProvider) {
    case 'google-translate':
      newTranslateThePageUrl = `https://translate.google.com/translate?&sl=${newSourceLanguageToTranslateThePage}&tl=${newTargetLanguageToTranslateThePage}&u=`;
      break;
    case 'microsoft-translator':
      newTranslateThePageUrl = `http://www.translatetheweb.com/?from=${newSourceLanguageToTranslateThePage}&to=${newTargetLanguageToTranslateThePage}&a=`;
      break;
    case 'yandex-translate':
      newTranslateThePageUrl = `https://translate.yandex.com/translate?lang=${newSourceLanguageToTranslateThePage}-${newTargetLanguageToTranslateThePage}&url=`;
      break;
    default:
      //
      break;
  }

  await browser.storage.sync.get().then(async (data) => {
    if (!data.owlTools) {
      await CreateOrCheckDefaultData();
    } else {
      let newData = {
        owlTools: {
          ...data.owlTools,
          translator: {
            translatorProvider: newTranslatorProvider,
            translateThePageProvider: newTranslateThePageProvider,
            sourceLanguageWhenOpeningTheService: newSourceLanguageWhenOpeningTheService,
            targetLanguageWhenOpeningTheService: newTargetLanguageWhenOpeningTheService,
            sourceLanguageWhenTranslating: newSourceLanguageWhenTranslating,
            targetLanguageWhenTranslating: newTargetLanguageWhenTranslating,
            sourceLanguageToTranslateThePage: newSourceLanguageToTranslateThePage,
            targetLanguageToTranslateThePage: newTargetLanguageToTranslateThePage,
            openingUrl: newOpeningUrl,
            translatingUrl: newTranslatingUrl,
            translateThePageUrl: newTranslateThePageUrl,
          },
          pronunciation: {
            popupSiteOne: {
              display: newPronunciationSiteOneDisplay,
              whereToOpen: newPronunciationSiteOneWhereToOpen,
              icon: newPronunciationSiteOneIcon,
              title: newPronunciationSiteOneTitle,
              protocol: newPronunciationSiteOneProtocol,
              address: newPronunciationSiteOneAddress,
            },
          },
        },
      };
      await browser.storage.sync.set(newData);
    }
  });
};

export default CreateTranslatorAndPronunciation;
