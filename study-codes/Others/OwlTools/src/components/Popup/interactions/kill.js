const handleKillInteractions = () => {
  document.querySelector('#kill').onclick = () => {
    browser.tabs.executeScript({
      file: '../../assets/scripts/kill-some-element.js',
    });

    close();
  };
};

export default handleKillInteractions;
