const handlePronunciationOnForvo = () => {
  browser.tabs.executeScript({
    code:
      'var targetURL = "https://forvo.com/search/" + getSelection().toString() + "/#displayer";',
  });

  browser.tabs.executeScript({
    file: '../../../src/components/EmbedContentBox/embed-content-box.js',
  });
};

export default handlePronunciationOnForvo;
