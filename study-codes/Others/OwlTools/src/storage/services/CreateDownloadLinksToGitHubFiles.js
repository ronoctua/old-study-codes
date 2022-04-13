import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const CreateDownloadLinksToGitHubFiles = async (newTrueOrFalse) => {
  await browser.storage.sync.get().then(async (data) => {
    if (!data.owlTools) {
      await CreateOrCheckDefaultData();
    } else {
      let newData = {
        owlTools: {
          ...data.owlTools,
          pageScripts: {
            ...data.owlTools.pageScripts,
            downloadLinksToGitHubFiles: newTrueOrFalse,
          },
        },
      };
      await browser.storage.sync.set(newData);
    }
  });
};

export default CreateDownloadLinksToGitHubFiles;
