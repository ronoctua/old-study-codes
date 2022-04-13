import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const CreateGeneralSettings = async (
  newUserLanguage,
  newSidebarTheme,
  newPopupTheme,
  newPopupKeyOne,
  newPopupKeyTwo,
  newAliasCharacter,
  newLogoSetted,
  newDisplayInThePopupDescription,
) => {
  await browser.storage.sync.get().then(async (data) => {
    if (!data.owlTools) {
      await CreateOrCheckDefaultData();
    } else {
      let newData = {
        owlTools: {
          ...data.owlTools,
          generalSettings: {
            userLanguage: newUserLanguage,
            themes: {
              sidebarTheme: newSidebarTheme,
              popupTheme: newPopupTheme,
            },
            shortcuts: {
              popupKeyOne: newPopupKeyOne,
              popupKeyTwo: newPopupKeyTwo,
              aliasCharacter: newAliasCharacter,
            },
            logo: {
              logoSetted: newLogoSetted,
              displayInThePopupDescription: newDisplayInThePopupDescription,
            },
          },
        },
      };
      await browser.storage.sync.set(newData);
    }
  });
};

export default CreateGeneralSettings;
