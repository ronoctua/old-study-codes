import CreateOrCheckDefaultData from '../../../../storage/services/CreateOrCheckDefaultData.js';

const restoreDataButton = document.querySelector('#restore-data-button');

const restoreDefaultData = () => {
  browser.storage.sync.clear().then(() => {
    CreateOrCheckDefaultData();
  });
};

restoreDataButton.addEventListener('click', restoreDefaultData);
