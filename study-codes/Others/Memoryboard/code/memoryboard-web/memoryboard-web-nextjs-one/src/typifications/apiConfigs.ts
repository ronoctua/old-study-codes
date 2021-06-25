export enum ActionTypesOfApiConfigs {
  UPDATE_FILES_PATH = '@apiConfig/FILES_PATH',
}

export interface IApiConfigs {
  filesPath: string | null;
}

export interface IApiConfigsState {
  readonly data: IApiConfigs;
}

export const initialApiConfigsStates = {
  data: {
    filesPath: null,
  },
};
