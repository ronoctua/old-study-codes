const handlePronunciationOnGoogle = () => {
  browser.tabs.executeScript({
    code:
      'var targetURL = "https://www.google.com/search?&q=how+to+pronounce+" + getSelection().toString();',
  });

  browser.tabs.executeScript({
    file: '../../../src/components/EmbedContentBox/embed-content-box.js',
  });
};

export default handlePronunciationOnGoogle;
