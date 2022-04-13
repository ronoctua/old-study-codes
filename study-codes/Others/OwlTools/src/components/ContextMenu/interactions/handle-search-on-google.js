const handleSearchOnGoogle = () => {
  browser.tabs.executeScript({
    code:
      'var targetURL = "https://www.google.com/search?&q=" + getSelection().toString();',
  });

  browser.tabs.executeScript({
    file: '../../../src/components/EmbedContentBox/embed-content-box.js',
  });
};

export default handleSearchOnGoogle;
