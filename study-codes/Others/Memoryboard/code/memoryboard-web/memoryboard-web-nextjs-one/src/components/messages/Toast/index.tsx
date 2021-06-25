import React, { useCallback, useEffect } from 'react';

import { useAppDispatch } from '@redux/rootDispatch';
import { ActionTypesOfMessages, IMessage } from '@typifications/message';

import { Container } from './styles';

const Toast: React.FC<{ message: IMessage }> = ({ message }) => {
  const dispatch = useAppDispatch();

  const removeToast = useCallback(
    (data: IMessage) => {
      dispatch({ type: ActionTypesOfMessages.REMOVE_MESSAGE, data });
    },
    [dispatch],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message]);

  return (
    <Container messageType={message.type}>
      <button onClick={() => removeToast(message)} type="button">
        <strong>{message.title}</strong>
        {message.content && <p>{message.content}</p>}
      </button>
    </Container>
  );
};

export default Toast;
