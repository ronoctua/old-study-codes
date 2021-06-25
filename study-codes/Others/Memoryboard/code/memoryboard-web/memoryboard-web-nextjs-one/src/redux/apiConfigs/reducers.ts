import { AnyAction, Reducer } from 'redux';

import {
  ActionTypesOfApiConfigs,
  IApiConfigs,
  IApiConfigsState,
  initialApiConfigsStates,
} from '@typifications/apiConfigs';

const reducer: Reducer<IApiConfigsState, AnyAction & IApiConfigs> = (
  state = initialApiConfigsStates,
  action,
) => {
  switch (action.type) {
    case ActionTypesOfApiConfigs.UPDATE_FILES_PATH:
      const filesPathNewContent = { ...state };
      filesPathNewContent.data.filesPath = action.data;
      return { ...filesPathNewContent };
    default:
      return state;
  }
};

export default reducer;
