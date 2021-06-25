import { AnyAction, Reducer } from 'redux';

import {
  ISocketConnection,
  ISocketConnectionState,
  initialSocketConnectionState,
  ActionTypesOfSocketConnection,
} from '@typifications/socketConnection';

const reducer: Reducer<ISocketConnectionState, AnyAction & ISocketConnection> =
  (state = initialSocketConnectionState, action) => {
    switch (action.type) {
      case ActionTypesOfSocketConnection.UPDATE_SOCKET_CONNECTION:
        const newStateToSocketConnection = { ...state };
        newStateToSocketConnection.data.isConnected = action.data;
        return { ...newStateToSocketConnection };
      case ActionTypesOfSocketConnection.UPDATE_RECONNECT_IN_ROOM_IS_NECESSARY:
        const newStateToReconnectInRoom = { ...state };
        newStateToReconnectInRoom.data.reconnectInRoomIsNecessary = action.data;
        return { ...newStateToReconnectInRoom };
      default:
        return state;
    }
  };

export default reducer;
