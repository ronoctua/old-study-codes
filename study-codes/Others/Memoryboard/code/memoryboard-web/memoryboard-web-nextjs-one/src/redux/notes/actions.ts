/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';

import { ActionTypesOfNotes, INote } from '@typifications/note';

export const updateNotes = (notesData: INote) =>
  action(ActionTypesOfNotes.UPDATE_NOTES, { notesData });

export const currentNote = (noteData: INote) =>
  action(ActionTypesOfNotes.UPDATE_CURRENT_NOTE, { noteData });

export const newCurrentRealtimeData = (newNoteData: INote) =>
  action(ActionTypesOfNotes.UPDATE_NOTES_REALTIME_DATA, { newNoteData });
