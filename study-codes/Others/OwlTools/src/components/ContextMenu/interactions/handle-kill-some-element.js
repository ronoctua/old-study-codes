const handleKillSomeElement = () => {
  browser.tabs.executeScript({
    file: '../../../src/assets/scripts/kill-some-element.js',
  });
};

export default handleKillSomeElement;
