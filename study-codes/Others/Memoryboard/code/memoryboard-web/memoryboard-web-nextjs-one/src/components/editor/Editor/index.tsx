import React, { useContext, useEffect, useState } from 'react';
import { IoHappy, IoSad, IoBackspace } from 'react-icons/io5';
import { MdFileDownload } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { PropagateLoader as Loader } from 'react-spinners';

import { NoteSaveButton } from '@components/notes/NoteSaveButton';
import { generalConfigs } from '@configs/general';
import { SocketContext } from '@contexts/SocketContext';
import { default as MonacoEditor } from '@monaco-editor/react';
import { useAppDispatch } from '@redux/rootDispatch';
import { StateType } from '@redux/rootTypes';
import { ActionTypesOfDashboard } from '@typifications/dashboard';
import { ActionTypesOfNotes } from '@typifications/note';
import { ActionTypesOfSocketConnection } from '@typifications/socketConnection';

import { EditorTopBar, EditorContainer, Container } from './styles';

const Editor: React.FC = () => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

  const username = useSelector((state: StateType) => state.users.data.username);
  const socketConnection = useSelector(
    (state: StateType) => state.socketConnection.data.isConnected,
  );
  const notes = useSelector((state: StateType) => state.notes.data);
  const latestRealtimeNotesData = useSelector(
    (state: StateType) => state.notes.data.userNotesRealtimeData,
  );
  const noteDisplayType = useSelector(
    (state: StateType) => state.dashboard.data.noteDisplayType,
  );
  const isReconnectInTheRoomNecessary = useSelector(
    (state: StateType) =>
      state.socketConnection.data.reconnectInRoomIsNecessary,
  );

  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');
  const [currentNote, setCurrentNote] = useState(notes.currentNote);
  const [content, setContent] = useState('');
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [userPermission, setUserPermission] = useState('');

  function handleEditorDidMount() {
    if (currentNote) {
      setIsEditorReady(true);
    }
  }

  useEffect(() => {
    setCurrentNote(notes.currentNote);

    if (currentNote) {
      setUserPermission(
        currentNote.users.filter((user) => user.username === username)[0]
          .permission,
      );

      setLanguage(currentNote.type);
    }

    if (userPermission !== 'edit' && isEditorReady) {
      dispatch({
        type: ActionTypesOfDashboard.UPDATE_NOTE_DISPLAY_TYPE,
        data: 'view',
      });

      currentNote && setContent(currentNote.content + ' ');
    }

    if (noteDisplayType !== 'realtime' && currentNote) {
      setContent(currentNote.content + ' ');
    } else if (
      userPermission === 'edit' &&
      noteDisplayType === 'realtime' &&
      currentNote &&
      isEditorReady
    ) {
      const latestNote = latestRealtimeNotesData.filter(
        (note) => note.id === currentNote.id,
      )[0];

      typeof latestNote !== 'undefined'
        ? setContent(latestNote.content)
        : setContent(currentNote.content);

      if (isReconnectInTheRoomNecessary) {
        socket.emit('noteId', currentNote.id);

        socket.on(`${currentNote.id}-content`, (realtimeContent) => {
          if (
            noteDisplayType === 'realtime' &&
            realtimeContent.id === currentNote.id &&
            realtimeContent.content !== null
          ) {
            setContent(realtimeContent.content);
          } else {
            setContent(currentNote.content);
          }
        });
      }
      socket.emit(`${currentNote.id}-latestNote`);

      dispatch({
        type: ActionTypesOfSocketConnection.UPDATE_RECONNECT_IN_ROOM_IS_NECESSARY,
        data: false,
      });
    }
  }, [
    currentNote,
    dispatch,
    isEditorReady,
    isReconnectInTheRoomNecessary,
    latestRealtimeNotesData,
    noteDisplayType,
    notes.currentNote,
    socket,
    userPermission,
    username,
  ]);

  function handleEditorChange(value: string | undefined) {
    if (!isReconnectInTheRoomNecessary && noteDisplayType === 'realtime') {
      socket.emit(`${currentNote?.id}-content`, value);

      dispatch({
        type: ActionTypesOfNotes.UPDATE_NOTES_REALTIME_DATA,
        data: { ...currentNote, content: value },
      });
    }
  }

  return (
    <>
      {currentNote && username ? (
        <>
          {noteDisplayType === 'realtime' && (
            <EditorTopBar>
              {socketConnection ? (
                <>
                  <div id="save-button">
                    <NoteSaveButton />
                  </div>

                  <div id="discard-button">
                    <button title="Discard realtime version (back to database version)">
                      <IoBackspace />
                    </button>
                  </div>

                  <div id="download-button">
                    <button title="Download">
                      <MdFileDownload />
                    </button>
                  </div>

                  <div id="connection-status">
                    <button title=": )" className="connected">
                      <IoHappy /> <span>Connected</span>
                    </button>
                  </div>
                </>
              ) : (
                <div id="connection-status">
                  <button title=": (" className="disconnected">
                    <IoSad /> <span>Disconnected</span>
                  </button>
                </div>
              )}
            </EditorTopBar>
          )}

          <EditorContainer>
            <MonacoEditor
              height="calc(100% - 0.0001px)" // Force height recalculation when browser is resized
              theme={theme}
              language={language}
              value={
                noteDisplayType === 'realtime' ? content : currentNote.content
              }
              loading={<Loader />}
              onMount={handleEditorDidMount}
              onChange={handleEditorChange}
              options={
                socketConnection && noteDisplayType === 'realtime'
                  ? {
                      readOnly: false,
                      lineNumbersMinChars: 1,
                    }
                  : {
                      readOnly: true,
                      lineNumbersMinChars: 1,
                    }
              }
            />
          </EditorContainer>
        </>
      ) : (
        <Container>
          <h1>{generalConfigs.APP_NAME.toUpperCase()}</h1>
        </Container>
      )}
    </>
  );
};

export { Editor };
