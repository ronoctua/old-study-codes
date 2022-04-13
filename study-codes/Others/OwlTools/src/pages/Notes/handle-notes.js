import CreateOrCheckDefaultData from '../../storage/services/CreateOrCheckDefaultData.js';
import CreateNotes from '../../storage/services/CreateNotes.js';

const notes1MenuItem = document.querySelector('#notes-1-menu-item');
const notes2MenuItem = document.querySelector('#notes-2-menu-item');
const notes3MenuItem = document.querySelector('#notes-3-menu-item');

const notesTextarea = document.querySelector('#notes-textarea');

var currentNotesNumber = 1;

CreateOrCheckDefaultData().then(() => {
  const getAndShowData = () => {
    browser.storage.sync.get().then(async (data) => {
      let allNotes = data.owlTools.notes;

      Object.keys(allNotes).forEach((notesItemKey) => {
        if (allNotes[notesItemKey].number === currentNotesNumber) {
          notesTextarea.value = allNotes[notesItemKey].content;
        }
      });
    });
  };

  const saveNotes = () => {
    browser.storage.sync.get().then(async (data) => {
      let allNotes = data.owlTools.notes;
      let newAllNotesData = {};

      Object.keys(allNotes).forEach((notesItemKey) => {
        let currentNotesData = allNotes[notesItemKey];

        if (allNotes[notesItemKey].number === currentNotesNumber) {
          currentNotesData.content = notesTextarea.value;
          newAllNotesData = {
            ...newAllNotesData,
            [notesItemKey]: currentNotesData,
          };
        } else {
          newAllNotesData = {
            ...newAllNotesData,
            [notesItemKey]: currentNotesData,
          };
        }
      });

      CreateNotes(newAllNotesData);
    });
  };

  const handleNotesMenu = (chosenNotesNumber) => {
    document.querySelectorAll('element.selected').forEach((element) => {
      element.classList.remove('selected');
    });

    document
      .querySelector(`#notes-${chosenNotesNumber}-menu-item`)
      .classList.add('selected');

    currentNotesNumber = chosenNotesNumber;

    getAndShowData();
  };

  getAndShowData();

  notesTextarea.addEventListener('input', saveNotes);

  notes1MenuItem.addEventListener('click', () => {
    handleNotesMenu(1);
  });

  notes2MenuItem.addEventListener('click', () => {
    handleNotesMenu(2);
  });

  notes3MenuItem.addEventListener('click', () => {
    handleNotesMenu(3);
  });
});
