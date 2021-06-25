import React from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '@redux/rootTypes';

import { Container, Button } from './styles';

const NoteUserImagesList: React.FC = () => {
  const filesPath = useSelector(
    (state: StateType) => state.apiConfigs.data.filesPath,
  );

  const currentNote = useSelector(
    (state: StateType) => state.notes.data.currentNote,
  );

  return (
    <Container>
      <nav>
        {filesPath &&
          currentNote &&
          currentNote.users.map((user) => (
            <Button
              key={user.username}
              title={user.username + ' - ' + user.permission}
              background={user.avatar && filesPath + '/' + user.avatar}
            />
          ))}
      </nav>
    </Container>
  );
};

export { NoteUserImagesList };
