import React from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '@redux/rootTypes';

import { Container } from './styles';

export const TopBarUserData: React.FC = () => {
  const user = useSelector((state: StateType) => state.users.data);

  return (
    <Container>
      <button>{user.username}</button>
    </Container>
  );
};
