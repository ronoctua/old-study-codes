import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@redux/rootDispatch';
import { StateType } from '@redux/rootTypes';
import { ActionTypesOfDashboard } from '@typifications/dashboard';

import { Container } from './styles';

export const TopBarMainData: React.FC = () => {
  const [userPermission, setUserPermission] = useState('');

  const dispatch = useAppDispatch();

  const currentSection = useSelector(
    (state: StateType) => state.dashboard.data.currentSection,
  );

  const username = useSelector((state: StateType) => state.users.data.username);

  const currentNote = useSelector(
    (state: StateType) => state.notes.data.currentNote,
  );

  const noteDisplayType = useSelector(
    (state: StateType) => state.dashboard.data.noteDisplayType,
  );

  function handleRealtimeChoice() {
    dispatch({
      type: ActionTypesOfDashboard.UPDATE_NOTE_DISPLAY_TYPE,
      data: 'realtime',
    });
  }

  async function handleDatabaseChoice() {
    dispatch({
      type: ActionTypesOfDashboard.UPDATE_NOTE_DISPLAY_TYPE,
      data: 'view',
    });
  }

  useEffect(() => {
    currentNote &&
      setUserPermission(
        currentNote.users.filter((user) => user.username === username)[0]
          .permission,
      );
  }, [currentNote, username]);

  return (
    <Container>
      {currentNote && currentSection && currentSection === 'Notes' ? (
        <>
          {userPermission === 'edit' && (
            <button
              onClick={handleRealtimeChoice}
              className={noteDisplayType === 'realtime' ? 'current' : ''}>
              <b>Realtime</b> editor
            </button>
          )}

          <button
            onClick={handleDatabaseChoice}
            title="Read-only"
            className={noteDisplayType !== 'realtime' ? 'current' : ''}>
            <b>Database</b> version
          </button>

          <p id="current-note">
            <span>
              <b>{currentNote?.title}</b>
            </span>
            <span>
              <i>{currentNote?.type}</i>
            </span>
          </p>
        </>
      ) : (
        <p>{currentSection !== 'Notes' && currentSection.toUpperCase()}</p>
      )}
    </Container>
  );
};
