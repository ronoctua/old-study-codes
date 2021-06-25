import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { AuthAndDataContext } from '@contexts/AuthAndDataContext';
import { socket } from '@contexts/SocketContext';
import { useAppDispatch } from '@redux/rootDispatch';
import { StateType } from '@redux/rootTypes';
import { ActionTypesOfDashboard } from '@typifications/dashboard';
import { ActionTypesOfSocketConnection } from '@typifications/socketConnection';

import { Container } from './styles';

const NotesTree: React.FC = () => {
  const notes = useSelector((state: StateType) => state.notes.data);
  const username = useSelector((state: StateType) => state.users.data.username);

  const [currentNotes, setCurrentNotes] = useState(notes.userNotes);
  const [currentNote, setCurrentNote] = useState(notes.currentNote);
  const [currentUsername, setCurrentUsername] = useState(username);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>();
  const [currentUserPermission, setCurrentUserPermission] =
    useState<string | null>();

  const dispatch = useAppDispatch();

  const { updateCurrentNote } = useContext(AuthAndDataContext);

  useEffect(() => {
    setCurrentNotes(notes.userNotes);
    setCurrentUsername(username);
  }, [notes.userNotes, username]);

  useEffect(() => {
    if (currentNoteId && typeof currentNoteId === 'number') {
      (async () =>
        await updateCurrentNote(currentNoteId).then((note) => {
          note && typeof note !== 'undefined' && setCurrentNote(note);
        }))();
    }
  }, [currentNoteId, updateCurrentNote]);

  useEffect(() => {
    setCurrentUserPermission(
      currentNote &&
        currentNote.users.filter((user) => user.username === currentUsername)[0]
          .permission,
    );
  }, [currentNote, currentUsername]);

  useEffect(() => {
    if (currentNoteId && typeof currentNoteId === 'number') {
      socket.disconnected;

      dispatch({
        type: ActionTypesOfDashboard.UPDATE_CURRENT_SECTION,
        data: 'Notes',
      });

      if (currentUserPermission === 'edit') {
        socket.emit('noteId', currentNoteId);

        dispatch({
          type: ActionTypesOfDashboard.UPDATE_NOTE_DISPLAY_TYPE,
          data: 'realtime',
        });

        dispatch({
          type: ActionTypesOfSocketConnection.UPDATE_RECONNECT_IN_ROOM_IS_NECESSARY,
          data: true,
        });
      } else {
        dispatch({
          type: ActionTypesOfDashboard.UPDATE_NOTE_DISPLAY_TYPE,
          data: 'view',
        });
      }
    }
  }, [currentNoteId, currentUserPermission, dispatch, currentNote]);

  return (
    <Container>
      <div>
        <ul>
          {currentNotes &&
            currentNotes.map((note) => (
              <li key={note.id}>
                <button
                  onClick={() => setCurrentNoteId(note.id)}
                  className={note.id === currentNote?.id ? 'current' : ''}>
                  {note.title}
                </button>
                <span>
                  {note.permission === 'edit' && <FaEdit />}
                  {note.permission === 'see' && <FaEye />} {note.type}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </Container>
  );
};

export { NotesTree };
