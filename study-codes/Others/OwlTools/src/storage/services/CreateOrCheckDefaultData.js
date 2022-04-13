import DefaultGeneralSettings from '../defaults/DefaultGeneralSettings.js';
import DefaultTranslatorAndPronunciation from '../defaults/DefaultTranslatorAndPronunciation.js';
import DefaultCustomSites from '../defaults/DefaultCustomSites.js';
import DefaultAlias from '../defaults/DefaultAlias.js';
import DefaultExchangeRate from '../defaults/DefaultExchangeRate.js';
import DefaultInjectionCodes from '../defaults/DefaultInjectionCodes.js';
import DefaultExtraFeatures from '../defaults/DefaultExtraFeatures.js';
import DefaultNotes from '../defaults/DefaultNotes.js';

const CreateOrCheckDefaultData = async () => {
  await browser.storage.sync.get().then((data) => {
    if (!data.owlTools) {
      let newData = {
        owlTools: {
          ...DefaultGeneralSettings,
          ...DefaultTranslatorAndPronunciation,
          ...DefaultCustomSites,
          ...DefaultAlias,
          ...DefaultExchangeRate,
          ...DefaultInjectionCodes,
          ...DefaultExtraFeatures,
          ...DefaultNotes,
        },
      };
      browser.storage.sync.set(newData);
    }
  });
};

export default CreateOrCheckDefaultData;
