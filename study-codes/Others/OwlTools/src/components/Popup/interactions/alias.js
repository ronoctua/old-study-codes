import handleAlias from '../../../assets/scripts/alias.js';

const handleAliasInteractions = () => {
  const aliasBar = document.querySelector('#alias-bar-input');

  aliasBar.addEventListener('keydown', () => {
    if (event.keyCode != 13) return;

    handleAlias(aliasBar.value, 'popup');
  });
};

export default handleAliasInteractions;
