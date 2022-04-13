const startYouTubeClosedCaption = (userLanguageCodes) => {
  const targetLanguagesArray = userLanguageCodes.match(/\S+/g);

  const handleYouTubeClosedCaption = () => {
    document.querySelectorAll('a.ytd-thumbnail').forEach((thumbnail) => {
      let xmlHttp;
      let videoIdentifier;

      if (thumbnail.getAttribute('thumbnail-checked') === 'true') {
        return;
      } else if (thumbnail.hasAttribute('href')) {
        videoIdentifier = thumbnail
          .getAttribute('href')
          .split('/watch?v=')[1]
          .split('&')[0];

        thumbnail.setAttribute('thumbnail-checked', 'true');
      } else {
        return;
      }

      xmlHttp = new XMLHttpRequest();

      xmlHttp.onload = function () {
        if (this.status === 200 && this.responseText != null) {
          let textResponse = xmlHttp.responseText;
          let languagesContainer = document.createElement('div');

          languagesContainer.style.display = 'flex';

          targetLanguagesArray.forEach((language) => {
            if (textResponse.includes('lang_code="' + language)) {
              let languageLabel = document.createElement('div');

              languageLabel.style.cssText = `
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 3px;
                padding: 3px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: bold;
                color: #000000;
                background-color: #ffffffa3;
                box-shadow: 0px 1px 2px #000000a3;
              `;

              languageLabel.textContent = language.toUpperCase();

              languagesContainer.appendChild(languageLabel);
            }
            thumbnail.appendChild(languagesContainer);
          });
        }
      };

      xmlHttp.open(
        'GET',
        'https://video.google.com/timedtext?type=list&v=' + videoIdentifier,
        true,
      );

      xmlHttp.send();
    });
  };

  handleYouTubeClosedCaption();
  setInterval(handleYouTubeClosedCaption, 1500);
};

const startYouTubeVersatileButtons = () => {
  const createAndInjectButtonOnThePage = () => {
    let subscribeButtons = document.querySelectorAll(
      '#subscribe-button.ytd-video-secondary-info-renderer',
    );
    let buttonsContainerToBeChecked = document.querySelector(
      '#owl-tools-buttons-container',
    );
    let currentPage = window.location.href;

    if (
      !subscribeButtons ||
      buttonsContainerToBeChecked ||
      !currentPage.includes('/watch?v=')
    ) {
      return;
    }

    browser.storage.sync.get().then((data) => {
      const buttonOneContent =
        data.owlTools.extraFeatures.youtubeVersatileButtons.buttonOne.content;
      const buttonOneAddress =
        data.owlTools.extraFeatures.youtubeVersatileButtons.buttonOne.address;

      const buttonTwoContent =
        data.owlTools.extraFeatures.youtubeVersatileButtons.buttonTwo.content;
      const buttonTwoAddress =
        data.owlTools.extraFeatures.youtubeVersatileButtons.buttonTwo.address;

      const buttonThreeContent =
        data.owlTools.extraFeatures.youtubeVersatileButtons.buttonThree.content;
      const buttonThreeAddress =
        data.owlTools.extraFeatures.youtubeVersatileButtons.buttonThree.address;

      const buttonFourContent =
        data.owlTools.extraFeatures.youtubeVersatileButtons.buttonFour.content;
      const buttonFourAddress =
        data.owlTools.extraFeatures.youtubeVersatileButtons.buttonFour.address;

      const buttonsContainer = document.createElement('div');
      const buttonOne = document.createElement('a');
      const buttonTwo = document.createElement('a');
      const buttonThree = document.createElement('a');
      const buttonFour = document.createElement('a');

      const buttonsContainerStyle = `
      display: flex;
      justify-content: space-between;
      min-width: 130px;
      min-height: 28px;
      margin: 6px 2px 0px;
    `;

      const buttonsStyle = `
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 28px;
      min-height: 28px;
      margin: 0 2px;
      border-radius: 6px;
      font-size: 15px;
      font-weight: bold;
      text-decoration: none;
      color: #dfdfdf;
      background-color: #575757;
    `;

      buttonsContainer.id = 'owl-tools-buttons-container';

      buttonsContainer.style.cssText = buttonsContainerStyle;
      buttonOne.style.cssText = buttonsStyle;
      buttonTwo.style.cssText = buttonsStyle;
      buttonThree.style.cssText = buttonsStyle;
      buttonFour.style.cssText = buttonsStyle;

      buttonOne.textContent = buttonOneContent;
      buttonTwo.textContent = buttonTwoContent;
      buttonThree.textContent = buttonThreeContent;
      buttonFour.textContent = buttonFourContent;

      buttonOne.target = '_blank';
      buttonTwo.target = '_blank';
      buttonThree.target = '_blank';
      buttonFour.target = '_blank';

      const handleButtonUrl = (buttonElement, buttonUrl) => {
        let videoId = currentPage.split('/watch?v=')[1].split('&')[0];
        let finalUrl = buttonUrl;

        finalUrl = finalUrl.replace('<yt-url>', currentPage);
        finalUrl = finalUrl.replace('<yt-id>', videoId);

        buttonElement.href = finalUrl;
      };

      handleButtonUrl(buttonOne, buttonOneAddress);
      handleButtonUrl(buttonTwo, buttonTwoAddress);
      handleButtonUrl(buttonThree, buttonThreeAddress);
      handleButtonUrl(buttonFour, buttonFourAddress);

      buttonsContainer.append(buttonOne, buttonTwo, buttonThree, buttonFour);

      subscribeButtons.forEach((theButton) => {
        theButton.appendChild(buttonsContainer);
      });
    });
  };

  createAndInjectButtonOnThePage();

  setInterval(createAndInjectButtonOnThePage, 3000);
};

browser.storage.sync.get().then((data) => {
  if (data.owlTools.extraFeatures.youtubeClosedCaption.status === true) {
    const userLanguageCodes =
      data.owlTools.extraFeatures.youtubeClosedCaption.languageCodes;

    startYouTubeClosedCaption(userLanguageCodes);
  }

  if (data.owlTools.extraFeatures.youtubeVersatileButtons.status === true) {
    startYouTubeVersatileButtons();
  }
});
