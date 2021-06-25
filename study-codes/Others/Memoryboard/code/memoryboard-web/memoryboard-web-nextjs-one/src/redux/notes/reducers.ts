import { AnyAction, Reducer } from 'redux';

import {
  INotesState,
  ActionTypesOfNotes,
  INote,
  initialNotesState,
} from '@typifications/note';

const reducer: Reducer<INotesState, AnyAction & INote> = (
  state = initialNotesState,
  action,
) => {
  switch (action.type) {
    case ActionTypesOfNotes.UPDATE_NOTES:
      const notesNewContent = { ...state };
      notesNewContent.data.userNotes = action.data;
      return { ...notesNewContent };
    case ActionTypesOfNotes.UPDATE_CURRENT_NOTE:
      const currentNewNote = { ...state };
      currentNewNote.data.currentNote = action.data;
      return { ...currentNewNote };
    case ActionTypesOfNotes.UPDATE_NOTES_REALTIME_DATA:
      const newUserNotesRealtimeData = state.data.userNotesRealtimeData.filter(
        (note) => note.id !== action.data.id,
      );
      newUserNotesRealtimeData.push(action.data);
      return {
        ...state,
        data: {
          ...state.data,
          userNotesRealtimeData: [...newUserNotesRealtimeData],
        },
      };
    default:
      return state;
  }
};

export default reducer;
