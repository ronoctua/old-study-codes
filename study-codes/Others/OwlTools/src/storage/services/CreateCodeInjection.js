import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const CreateCodeInjection = async (newCodeInjectionData) => {
  await browser.storage.sync.get().then(async (data) => {
    if (!data.owlTools) {
      await CreateOrCheckDefaultData();
    } else {
      let newData = {
        owlTools: {
          ...data.owlTools,
          injectionCodes: newCodeInjectionData,
        },
      };
      await browser.storage.sync.set(newData);
    }
  });
};

export default CreateCodeInjection;
