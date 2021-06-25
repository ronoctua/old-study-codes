export enum ActionTypesOfUsers {
  UPDATE_USER = '@user/UPDATE_USER',
  REMOVE_USER = '@user/REMOVE_USER',
}

export interface IUser {
  username: string;
  email: string;
  isAdmin: boolean;
  theme: string;
  editorTheme: string;
  avatar: string | null;
}

export interface IUsersState {
  readonly data: IUser;
}

export const initialUserData = {
  username: '',
  email: '',
  isAdmin: false,
  theme: 'default',
  editorTheme: 'default',
  avatar: null,
};
