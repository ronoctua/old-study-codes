import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const CreateExchangeRate = async (
  newDisplay,
  newHowManyToDisplay,
  newSource,
  newApiKey,
  newConversionMethod,
  newDecimalSeparator,
  newCurrencyBase,
  newCurrencyOne,
  newCurrencyTwo,
  newCurrencyThree,
  newCurrencyFour,
) => {
  await browser.storage.sync.get().then(async (data) => {
    if (!data.owlTools) {
      await CreateOrCheckDefaultData();
    } else {
      let newData = {
        owlTools: {
          ...data.owlTools,
          exchangeRate: {
            exchangeRateGroupOne: {
              display: newDisplay,
              howManyToDisplay: newHowManyToDisplay,
              source: newSource,
              apiKey: newApiKey,
              conversionMethod: newConversionMethod,
              decimalSeparator: newDecimalSeparator,
              currencyBase: newCurrencyBase,
              currencyOne: newCurrencyOne,
              currencyTwo: newCurrencyTwo,
              currencyThree: newCurrencyThree,
              currencyFour: newCurrencyFour,
            },
          },
        },
      };
      await browser.storage.sync.set(newData);
    }
  });
};

export default CreateExchangeRate;
