import CreateOrCheckDefaultData from '../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateAlias from '../../../../storage/services/CreateAlias.js';

const aliasListTextarea = document.querySelector('#alias-list-textarea');
const whereToOpenFromPopupSelect = document.querySelector(
  '#where-to-open-from-popup-select',
);
const whereToOpenFromOmniboxSelect = document.querySelector(
  '#where-to-open-from-omnibox-select',
);
const aliasSaveButton = document.querySelector('#alias-save-button');

var aliasListData = '';

CreateOrCheckDefaultData().then(() => {
  browser.storage.sync.get().then(async (data) => {
    await data.owlTools.alias.aliasAndUrls.forEach((element) => {
      aliasListData = aliasListData + element[0] + ' ' + element[1] + '\n';
    });

    aliasListTextarea.value = aliasListData;
    whereToOpenFromPopupSelect.value = data.owlTools.alias.whereToOpenFromPopup;
    whereToOpenFromOmniboxSelect.value =
      data.owlTools.alias.whereToOpenFromOmnibox;
  });
});

const handleSaveNewData = () => {
  CreateAlias(
    aliasListTextarea.value,
    whereToOpenFromPopupSelect.value,
    whereToOpenFromOmniboxSelect.value,
  );
};

aliasSaveButton.addEventListener('click', handleSaveNewData);
