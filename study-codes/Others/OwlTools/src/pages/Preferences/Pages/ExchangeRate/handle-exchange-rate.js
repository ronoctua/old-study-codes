import CreateOrCheckDefaultData from '../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateExchangeRate from '../../../../storage/services/CreateExchangeRate.js';

import { currencySelectOptions } from './select-options/exchangerate.host.js';

const displayOnOff = document.querySelector('#display-on-off');

const conversionMethodSelect = document.querySelector(
  '#conversion-method-select',
);

const decimalSeparatorSelect = document.querySelector(
  '#decimal-separator-select',
);

const currencyBaseSelect = document.querySelector('#currency-base-select');

const currencyOneSelect = document.querySelector('#currency-one-select');
const currencyTwoSelect = document.querySelector('#currency-two-select');
const currencyThreeSelect = document.querySelector('#currency-three-select');
const currencyFourSelect = document.querySelector('#currency-four-select');

// const apiKeyInput = document.querySelector('#api-key-input');

const exchangeRateSaveButton = document.querySelector(
  '#exchange-rate-save-button',
);

currencyBaseSelect.insertAdjacentHTML('afterbegin', currencySelectOptions);
currencyOneSelect.insertAdjacentHTML('afterbegin', currencySelectOptions);
currencyTwoSelect.insertAdjacentHTML('afterbegin', currencySelectOptions);
currencyThreeSelect.insertAdjacentHTML('afterbegin', currencySelectOptions);
currencyFourSelect.insertAdjacentHTML('afterbegin', currencySelectOptions);

CreateOrCheckDefaultData().then(() => {
  browser.storage.sync.get().then(async (data) => {
    displayOnOff.checked =
      data.owlTools.exchangeRate.exchangeRateGroupOne.display;

    conversionMethodSelect.value =
      data.owlTools.exchangeRate.exchangeRateGroupOne.conversionMethod;

    decimalSeparatorSelect.value =
      data.owlTools.exchangeRate.exchangeRateGroupOne.decimalSeparator;

    currencyBaseSelect.value =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyBase;

    currencyOneSelect.value =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyOne;
    currencyTwoSelect.value =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyTwo;
    currencyThreeSelect.value =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyThree;
    currencyFourSelect.value =
      data.owlTools.exchangeRate.exchangeRateGroupOne.currencyFour;

    // apiKeyInput.value = data.owlTools.exchangeRate.exchangeRateGroupOne.apiKey;
  });
});

const handleSaveNewData = () => {
  CreateExchangeRate(
    displayOnOff.checked,
    4,
    'exchangeratehostapi',
    '',
    conversionMethodSelect.value,
    decimalSeparatorSelect.value,
    currencyBaseSelect.value,
    currencyOneSelect.value,
    currencyTwoSelect.value,
    currencyThreeSelect.value,
    currencyFourSelect.value,
  );
};

exchangeRateSaveButton.addEventListener('click', handleSaveNewData);
