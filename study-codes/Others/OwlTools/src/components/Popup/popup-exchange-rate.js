import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const currencyOneNameElement = document.querySelector('#currency-one-name');
const currencyTwoNameElement = document.querySelector('#currency-two-name');
const currencyThreeNameElement = document.querySelector('#currency-three-name');
const currencyFourNameElement = document.querySelector('#currency-four-name');

const currencyOneValueElement = document.querySelector('#currency-one-value');
const currencyTwoValueElement = document.querySelector('#currency-two-value');
const currencyThreeValueElement = document.querySelector(
  '#currency-three-value',
);
const currencyFourValueElement = document.querySelector('#currency-four-value');

CreateOrCheckDefaultData().then(() => {
  browser.storage.sync.get().then(async (data) => {
    if (data.owlTools.exchangeRate.exchangeRateGroupOne.display === false) {
      return;
    }

    const conversionMethod =
      data.owlTools.exchangeRate.exchangeRateGroupOne.conversionMethod;

    const decimalSeparator =
      data.owlTools.exchangeRate.exchangeRateGroupOne.decimalSeparator;

    const baseCurrency =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyBase;

    const currencyOneName =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyOne;
    const currencyTwoName =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyTwo;
    const currencyThreeName =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyThree;
    const currencyFourName =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyFour;

    // const apiKey = data.owlTools.exchangeRate.exchangeRateGroupOne.apiKey;

    const handleConvertionMethodOneOfBaseToXOfTargets = () => {
      let exchangeRateApiUrl = `https://api.exchangerate.host/latest?&base=${baseCurrency}&symbols=${currencyOneName},${currencyTwoName},${currencyThreeName},${currencyFourName}`;

      fetch(exchangeRateApiUrl, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
          let currencyOneValue = data.rates[currencyOneName].toFixed(2);
          let currencyTwoValue = data.rates[currencyOneName].toFixed(2);
          let currencyThreeValue = data.rates[currencyOneName].toFixed(2);
          let currencyFourValue = data.rates[currencyOneName].toFixed(2);

          currencyOneNameElement.textContent = currencyOneName;
          currencyTwoNameElement.textContent = currencyTwoName;
          currencyThreeNameElement.textContent = currencyThreeName;
          currencyFourNameElement.textContent = currencyFourName;

          if (decimalSeparator === ',') {
            currencyOneValue = currencyOneValue.replace('.', ',');
            currencyTwoValue = currencyTwoValue.replace('.', ',');
            currencyThreeValue = currencyThreeValue.replace('.', ',');
            currencyFourValue = currencyFourValue.replace('.', ',');
          }

          currencyOneValueElement.textContent = currencyOneValue;
          currencyTwoValueElement.textContent = currencyTwoValue;
          currencyThreeValueElement.textContent = currencyThreeValue;
          currencyFourValueElement.textContent = currencyFourValue;
        })
        .catch((error) => console.log(error));
    };

    const handleConvertionMethodXOfBaseToOneOfTargets = () => {
      let exchangeRateApiUrlOne = `https://api.exchangerate.host/latest?&base=${currencyOneName}&symbols=${baseCurrency}`;
      let exchangeRateApiUrlTwo = `https://api.exchangerate.host/latest?&base=${currencyTwoName}&symbols=${baseCurrency}`;
      let exchangeRateApiUrlThree = `https://api.exchangerate.host/latest?&base=${currencyThreeName}&symbols=${baseCurrency}`;
      let exchangeRateApiUrlFour = `https://api.exchangerate.host/latest?&base=${currencyFourName}&symbols=${baseCurrency}`;

      fetch(exchangeRateApiUrlOne, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
          let currencyOneValue = data.rates[baseCurrency].toFixed(2);

          currencyOneNameElement.textContent = '1' + currencyOneName;

          if (decimalSeparator === ',') {
            currencyOneValue = currencyOneValue.replace('.', ',');
          }

          currencyOneValueElement.textContent = currencyOneValue;
        })
        .catch((error) => console.log(error));

      fetch(exchangeRateApiUrlTwo, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
          let currencyTwoValue = data.rates[baseCurrency].toFixed(2);

          currencyTwoNameElement.textContent = '1' + currencyTwoName;

          if (decimalSeparator === ',') {
            currencyTwoValue = currencyTwoValue.replace('.', ',');
          }

          currencyTwoValueElement.textContent = currencyTwoValue;
        })
        .catch((error) => console.log(error));

      fetch(exchangeRateApiUrlThree, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
          let currencyThreeValue = data.rates[baseCurrency].toFixed(2);

          currencyThreeNameElement.textContent = '1' + currencyThreeName;

          if (decimalSeparator === ',') {
            currencyThreeValue = currencyThreeValue.replace('.', ',');
          }

          currencyThreeValueElement.textContent = currencyThreeValue;
        })
        .catch((error) => console.log(error));

      fetch(exchangeRateApiUrlFour, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
          let currencyFourValue = data.rates[baseCurrency].toFixed(2);

          currencyFourNameElement.textContent = '1' + currencyFourName;

          if (decimalSeparator === ',') {
            currencyFourValue = currencyFourValue.replace('.', ',');
          }

          currencyFourValueElement.textContent = currencyFourValue;
        })
        .catch((error) => console.log(error));
    };

    conversionMethod === 'one-of-base-to-x-of-targets'
      ? handleConvertionMethodOneOfBaseToXOfTargets()
      : handleConvertionMethodXOfBaseToOneOfTargets();
  });
});
