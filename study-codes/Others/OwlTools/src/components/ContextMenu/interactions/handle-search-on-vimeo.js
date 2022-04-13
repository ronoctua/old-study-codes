const handleSearchOnVimeo = () => {
  browser.tabs.executeScript({
    code:
      'var targetURL = "https://vimeo.com/search?q=" + getSelection().toString();',
  });

  browser.tabs.executeScript({
    file: '../../../src/components/EmbedContentBox/embed-content-box.js',
  });
};

export default handleSearchOnVimeo;
