import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const CreateAlias = async (
  newAliasAndUrls,
  newWhereToOpenFromPopup,
  newWhereToOpenFromOmnibox,
) => {
  var newAliasandUrlsFormattedData = [];
  const newAliasAndUrlsSplitByLine = newAliasAndUrls.split('\n');

  await newAliasAndUrlsSplitByLine.forEach((element) => {
    let elementAliasCode = element.replace(/ .*/, '');
    let elementAliasUrl = element.substr(element.indexOf(' ') + 1);

    if (
      elementAliasCode &&
      elementAliasUrl &&
      elementAliasCode !== elementAliasUrl
    ) {
      newAliasandUrlsFormattedData = [
        ...newAliasandUrlsFormattedData,
        [elementAliasCode, elementAliasUrl],
      ];
    }
  });

  await browser.storage.sync.get().then(async (data) => {
    if (!data.owlTools) {
      await CreateOrCheckDefaultData();
    } else {
      let newData = {
        owlTools: {
          ...data.owlTools,
          alias: {
            aliasAndUrls: newAliasandUrlsFormattedData,
            whereToOpenFromPopup: newWhereToOpenFromPopup,
            whereToOpenFromOmnibox: newWhereToOpenFromOmnibox,
          },
        },
      };
      await browser.storage.sync.set(newData);
    }
  });
};

export default CreateAlias;
