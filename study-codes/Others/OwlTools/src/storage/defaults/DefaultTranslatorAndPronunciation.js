const DefaultTranslatorAndPronunciation = {
  translator: {
    translatorProvider: 'google-translate',
    translateThePageProvider: 'google-translate',
    sourceLanguageWhenOpeningTheService: 'pt',
    targetLanguageWhenOpeningTheService: 'en',
    sourceLanguageWhenTranslating: 'auto',
    targetLanguageWhenTranslating: 'pt',
    sourceLanguageToTranslateThePage: 'auto',
    targetLanguageToTranslateThePage: 'pt',
    openingUrl: 'https://translate.google.com/?sl=pt&tl=en',
    translatingUrl: 'https://translate.google.com/?sl=auto&tl=pt&text=',
    translateThePageUrl:
      'https://translate.google.com/translate?&sl=auto&tl=pt&u=',
  },
  pronunciation: {
    popupSiteOne: {
      display: true,
      whereToOpen: 'popup',
      icon: '🗣',
      title: 'Pronunciation 1',
      protocol: 'https://',
      address: 'forvo.com',
    },
  },
};

export default DefaultTranslatorAndPronunciation;
