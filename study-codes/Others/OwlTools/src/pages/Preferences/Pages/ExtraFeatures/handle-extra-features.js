import CreateOrCheckDefaultData from '../../../../storage/services/CreateOrCheckDefaultData.js';
import CreateExtraFeatures from '../../../../storage/services/CreateExtraFeatures.js';

const githubIconOnOff = document.querySelector('#github-icon-on-off');
const youtubeClosedCaptionOnOff = document.querySelector(
  '#youtube-closed-caption-on-off',
);
const closedCaptionLanguageCodesInput = document.querySelector(
  '#closed-caption-language-codes-input',
);

const youtubeVersatileButtonsOnOff = document.querySelector(
  '#youtube-versatile-buttons-on-off',
);
const youtubeVersatileButtonOneContentInput = document.querySelector(
  '#youtube-versatile-button-one-content-input',
);
const youtubeVersatileButtonOneAddressInput = document.querySelector(
  '#youtube-versatile-button-one-address-input',
);
const youtubeVersatileButtonTwoContentInput = document.querySelector(
  '#youtube-versatile-button-two-content-input',
);
const youtubeVersatileButtonTwoAddressInput = document.querySelector(
  '#youtube-versatile-button-two-address-input',
);
const youtubeVersatileButtonThreeContentInput = document.querySelector(
  '#youtube-versatile-button-three-content-input',
);
const youtubeVersatileButtonThreeAddressInput = document.querySelector(
  '#youtube-versatile-button-three-address-input',
);
const youtubeVersatileButtonFourContentInput = document.querySelector(
  '#youtube-versatile-button-four-content-input',
);
const youtubeVersatileButtonFourAddressInput = document.querySelector(
  '#youtube-versatile-button-four-address-input',
);

const twichScrollbarIconOnOff = document.querySelector(
  '#twich-scrollbar-icon-on-off',
);
const extraFeaturesSaveButton = document.querySelector(
  '#extra-features-save-button',
);

CreateOrCheckDefaultData().then(() => {
  browser.storage.sync.get().then(async (data) => {
    githubIconOnOff.checked =
      data.owlTools.extraFeatures.githubFilesDownloadIcon.status;

    youtubeClosedCaptionOnOff.checked =
      data.owlTools.extraFeatures.youtubeClosedCaption.status;
    closedCaptionLanguageCodesInput.value =
      data.owlTools.extraFeatures.youtubeClosedCaption.languageCodes;

    youtubeVersatileButtonsOnOff.checked =
      data.owlTools.extraFeatures.youtubeVersatileButtons.status;

    youtubeVersatileButtonOneContentInput.value =
      data.owlTools.extraFeatures.youtubeVersatileButtons.buttonOne.content;
    youtubeVersatileButtonOneAddressInput.value =
      data.owlTools.extraFeatures.youtubeVersatileButtons.buttonOne.address;

    youtubeVersatileButtonTwoContentInput.value =
      data.owlTools.extraFeatures.youtubeVersatileButtons.buttonTwo.content;
    youtubeVersatileButtonTwoAddressInput.value =
      data.owlTools.extraFeatures.youtubeVersatileButtons.buttonTwo.address;

    youtubeVersatileButtonThreeContentInput.value =
      data.owlTools.extraFeatures.youtubeVersatileButtons.buttonThree.content;
    youtubeVersatileButtonThreeAddressInput.value =
      data.owlTools.extraFeatures.youtubeVersatileButtons.buttonThree.address;

    youtubeVersatileButtonFourContentInput.value =
      data.owlTools.extraFeatures.youtubeVersatileButtons.buttonFour.content;
    youtubeVersatileButtonFourAddressInput.value =
      data.owlTools.extraFeatures.youtubeVersatileButtons.buttonFour.address;

    twichScrollbarIconOnOff.checked =
      data.owlTools.extraFeatures.twitchScrollbar.status;
  });
});

const handleSaveNewData = () => {
  CreateExtraFeatures(
    githubIconOnOff.checked,
    youtubeClosedCaptionOnOff.checked,
    closedCaptionLanguageCodesInput.value,
    youtubeVersatileButtonsOnOff.checked,
    'false',
    youtubeVersatileButtonOneContentInput.value,
    youtubeVersatileButtonOneAddressInput.value,
    '⇡ new tab',
    'false',
    youtubeVersatileButtonTwoContentInput.value,
    youtubeVersatileButtonTwoAddressInput.value,
    '⇡ new tab',
    'false',
    youtubeVersatileButtonThreeContentInput.value,
    youtubeVersatileButtonThreeAddressInput.value,
    '⇡ new tab',
    'false',
    youtubeVersatileButtonFourContentInput.value,
    youtubeVersatileButtonFourAddressInput.value,
    '⇡ new tab',
    twichScrollbarIconOnOff.checked,
  );
};

extraFeaturesSaveButton.addEventListener('click', handleSaveNewData);
