export enum ActionTypesOfNotes {
  UPDATE_CURRENT_NOTE = '@note/UPDATE_CURRENT_NOTE',
  UPDATE_NOTES = '@note/UPDATE_NOTES',
  UPDATE_NOTES_REALTIME_DATA = '@note/UPDATE_NOTES_REALTIME_DATA',
}

export interface INote {
  id: number | null;
  title: string;
  type: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  permission: string;
  users: {
    avatar: string | null;
    isAdmin: boolean;
    permission: string;
    username: string;
  }[];
}

export interface INotesState {
  readonly data: {
    currentNote: INote | null;
    userNotesRealtimeData: INote[];
    userNotes: INote[];
  };
}

export const initialNotesState = {
  data: {
    currentNote: null,
    userNotesRealtimeData: [],
    userNotes: [],
  },
};
