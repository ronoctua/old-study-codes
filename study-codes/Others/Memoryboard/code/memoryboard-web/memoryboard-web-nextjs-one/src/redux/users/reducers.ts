import { AnyAction, Reducer } from 'redux';

import {
  IUsersState,
  ActionTypesOfUsers,
  IUser,
  initialUserData,
} from '@typifications/user';

const initialState: IUsersState = {
  data: {
    ...initialUserData,
  },
};

const reducer: Reducer<IUsersState, AnyAction & IUser> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionTypesOfUsers.UPDATE_USER:
      const newState = { ...state };
      newState.data = action.data;
      return { ...newState };
    case ActionTypesOfUsers.REMOVE_USER:
      return { ...state, data: { ...initialState.data } };
    default:
      return state;
  }
};

export default reducer;
