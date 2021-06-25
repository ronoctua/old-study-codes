import { nanoid } from 'nanoid';
import React, { useContext } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { AuthAndDataContext } from '@contexts/AuthAndDataContext';
import { useAppDispatch } from '@redux/rootDispatch';
import { StateType } from '@redux/rootTypes';
import { appApi } from '@shared/apis/appApi';
import { ActionTypesOfMessages } from '@typifications/message';

import { Container } from './styles';

const NoteSaveButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { updateCurrentNote } = useContext(AuthAndDataContext);
  const currentNote = useSelector(
    (state: StateType) => state.notes.data.currentNote,
  );
  const realtimeNotesData = useSelector(
    (state: StateType) => state.notes.data.userNotesRealtimeData,
  );

  async function handleSaveNote() {
    if (currentNote) {
      try {
        const newNoteData = realtimeNotesData.filter(
          (note) => note.id === currentNote.id,
        )[0];

        if (newNoteData) {
          await appApi.patch(`/notes/user/note/update/${currentNote.id}`, {
            title: newNoteData.title,
            type: newNoteData.type,
            content: newNoteData.content,
          });

          await updateCurrentNote(newNoteData.id);
        }
      } catch (error) {
        dispatch({
          type: ActionTypesOfMessages.SEND_MESSAGE,
          data: {
            id: nanoid(),
            type: 'error',
            title: 'Error',
            content: error.response.data.message,
          },
        });
      }
    } else {
      dispatch({
        type: ActionTypesOfMessages.SEND_MESSAGE,
        data: {
          id: nanoid(),
          type: 'error',
          title: 'Error updating note',
          content: 'No new note content to save was found.',
        },
      });
    }
  }

  return (
    <Container
      onClick={handleSaveNote}
      title="Save realtime version to database">
      <FaRegSave />
    </Container>
  );
};

export { NoteSaveButton };
