import handleAlias from '../../assets/scripts/alias.js';

const handleOmnibox = async () => {
  await browser.omnibox.setDefaultSuggestion({
    description: 'Owl Tools ALIAS',
  });

  await browser.omnibox.onInputEntered.addListener((aliasValue) => {
    handleAlias(aliasValue, 'omnibox');
  });
};

export default handleOmnibox;
