import { createContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAppDispatch } from '@redux/rootDispatch';
import { ActionTypesOfSocketConnection } from '@typifications/socketConnection';

export const socket = io(`${process.env.APP_API_URL}`);

export const SocketContext = createContext({} as Socket);

export const SocketProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      if (socket.connected === true) {
        dispatch({
          type: ActionTypesOfSocketConnection.UPDATE_SOCKET_CONNECTION,
          data: socket.connected,
        });
      }
    });

    socket.on('disconnect', () => {
      socket.connect();

      dispatch({
        type: ActionTypesOfSocketConnection.UPDATE_RECONNECT_IN_ROOM_IS_NECESSARY,
        data: true,
      });

      setTimeout(() => {
        if (socket.connected === false) {
          dispatch({
            type: ActionTypesOfSocketConnection.UPDATE_SOCKET_CONNECTION,
            data: socket.connected,
          });
        }
      }, 1000);
    });
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
