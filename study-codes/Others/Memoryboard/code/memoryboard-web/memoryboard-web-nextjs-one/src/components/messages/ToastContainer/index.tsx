import React from 'react';
import { useSelector } from 'react-redux';

import { StateType } from '@redux/rootTypes';

import Toast from '../Toast';
import { Container } from './styles';

const ToastContainer: React.FC = () => {
  const messages = useSelector((state: StateType) => state.messages.data);

  return (
    <Container>
      {messages.map((message) => {
        if (message.id) return <Toast key={message.id} message={message} />;
      })}
    </Container>
  );
};

export default ToastContainer;
