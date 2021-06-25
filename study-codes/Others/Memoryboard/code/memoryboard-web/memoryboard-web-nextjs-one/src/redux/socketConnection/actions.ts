/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';

import { ActionTypesOfSocketConnection } from '@typifications/socketConnection';

interface IParms {
  data: boolean;
}

export const updateSocketConnection = (isConnected: IParms) =>
  action(ActionTypesOfSocketConnection.UPDATE_SOCKET_CONNECTION, {
    isConnected,
  });

export const updateReconnectInTheRoomIsNecessary = (
  reconnectInTheRoomIsNecessary: IParms,
) =>
  action(ActionTypesOfSocketConnection.UPDATE_RECONNECT_IN_ROOM_IS_NECESSARY, {
    reconnectInTheRoomIsNecessary,
  });
