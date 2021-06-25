export enum ActionTypesOfSocketConnection {
  UPDATE_SOCKET_CONNECTION = '@socketConnection/UPDATE_SOCKET_CONNECTION',
  UPDATE_RECONNECT_IN_ROOM_IS_NECESSARY = '@socketConnection/UPDATE_RECONNECT_IN_ROOM_IS_NECESSARY',
}

export interface ISocketConnection {
  isConnected: boolean;
  reconnectInRoomIsNecessary: boolean;
}

export interface ISocketConnectionState {
  readonly data: ISocketConnection;
}

export const initialSocketConnectionState = {
  data: {
    isConnected: false,
    reconnectInRoomIsNecessary: true,
  },
};
