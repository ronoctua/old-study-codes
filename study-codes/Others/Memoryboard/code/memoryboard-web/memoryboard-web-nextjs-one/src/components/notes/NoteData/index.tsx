import React from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '@redux/rootTypes';

import { Container } from './styles';

const NoteData: React.FC = () => {
  const currentNote = useSelector(
    (state: StateType) => state.notes.data.currentNote,
  );

  return (
    <Container>
      {currentNote && (
        <div>
          <h1>{currentNote?.title}</h1>

          <div>
            <h2>
              <span>{currentNote?.type}</span>
            </h2>
          </div>

          <ul>
            <li>
              <h2>
                <span>▼ Users</span>
              </h2>
            </li>
            <ul>
              {currentNote.users.map((user) => (
                <li key={user.username}>
                  <span className="highlight">{user.username}</span>
                  <span>{user.permission}</span>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      )}
    </Container>
  );
};

export { NoteData };
