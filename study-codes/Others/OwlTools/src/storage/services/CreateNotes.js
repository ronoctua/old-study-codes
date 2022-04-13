import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';

const CreateNotes = async (newNotesData) => {
  await browser.storage.sync.get().then(async (data) => {
    if (!data.owlTools) {
      await CreateOrCheckDefaultData();
    } else {
      let newData = {
        owlTools: {
          ...data.owlTools,
          notes: newNotesData,
        },
      };
      await browser.storage.sync.set(newData);
    }
  });
};

export default CreateNotes;
