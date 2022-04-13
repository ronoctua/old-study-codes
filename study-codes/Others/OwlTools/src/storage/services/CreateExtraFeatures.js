import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const CreateExtraFeatures = async (
  newGithubFilesDownloadIconStatus,
  newYoutubeClosedCaptionStatus,
  newYoutubeClosedCaptionLanguageCodes,
  newYoutubeVersatileButtonsStatus,
  newYoutubeVersatileButtonOneStatus,
  newYoutubeVersatileButtonOneContent,
  newYoutubeVersatileButtonOneAddress,
  newYoutubeVersatileButtonOneWhereToOpen,
  newYoutubeVersatileButtonTwoStatus,
  newYoutubeVersatileButtonTwoContent,
  newYoutubeVersatileButtonTwoAddress,
  newYoutubeVersatileButtonTwoWhereToOpen,
  newYoutubeVersatileButtonThreeStatus,
  newYoutubeVersatileButtonThreeContent,
  newYoutubeVersatileButtonThreeAddress,
  newYoutubeVersatileButtonThreeWhereToOpen,
  newYoutubeVersatileButtonFourStatus,
  newYoutubeVersatileButtonFourContent,
  newYoutubeVersatileButtonFourAddress,
  newYoutubeVersatileButtonFourWhereToOpen,
  newTwitchScrollbarStatus,
) => {
  await browser.storage.sync.get().then(async (data) => {
    if (!data.owlTools) {
      await CreateOrCheckDefaultData();
    } else {
      let newData = {
        owlTools: {
          ...data.owlTools,
          extraFeatures: {
            githubFilesDownloadIcon: {
              status: newGithubFilesDownloadIconStatus,
            },
            youtubeClosedCaption: {
              status: newYoutubeClosedCaptionStatus,
              languageCodes: newYoutubeClosedCaptionLanguageCodes,
            },
            youtubeVersatileButtons: {
              status: newYoutubeVersatileButtonsStatus,
              buttonOne: {
                status: newYoutubeVersatileButtonOneStatus,
                content: newYoutubeVersatileButtonOneContent,
                address: newYoutubeVersatileButtonOneAddress,
                whereToOpen: newYoutubeVersatileButtonOneWhereToOpen,
              },
              buttonTwo: {
                status: newYoutubeVersatileButtonTwoStatus,
                content: newYoutubeVersatileButtonTwoContent,
                address: newYoutubeVersatileButtonTwoAddress,
                whereToOpen: newYoutubeVersatileButtonTwoWhereToOpen,
              },
              buttonThree: {
                status: newYoutubeVersatileButtonThreeStatus,
                content: newYoutubeVersatileButtonThreeContent,
                address: newYoutubeVersatileButtonThreeAddress,
                whereToOpen: newYoutubeVersatileButtonThreeWhereToOpen,
              },
              buttonFour: {
                status: newYoutubeVersatileButtonFourStatus,
                content: newYoutubeVersatileButtonFourContent,
                address: newYoutubeVersatileButtonFourAddress,
                whereToOpen: newYoutubeVersatileButtonFourWhereToOpen,
              },
            },
            twitchScrollbar: {
              status: newTwitchScrollbarStatus,
            },
          },
        },
      };
      await browser.storage.sync.set(newData);
    }
  });
};

export default CreateExtraFeatures;
