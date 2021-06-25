export enum ActionTypesOfMessages {
  SEND_MESSAGE = '@message/SEND_MESSAGE',
  REMOVE_MESSAGE = '@message/REMOVE_MESSAGE',
}

export interface IMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  content: string;
}

export interface IMessageState {
  readonly data: IMessage[];
}
