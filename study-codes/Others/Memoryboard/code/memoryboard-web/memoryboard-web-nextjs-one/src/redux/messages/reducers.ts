import { Reducer } from 'redux';

import { IMessageState, ActionTypesOfMessages } from '@typifications/message';

const initialState: IMessageState = {
  data: [],
};

const reducer: Reducer<IMessageState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypesOfMessages.SEND_MESSAGE:
      return { ...state, data: [...state.data, action.data] };
    case ActionTypesOfMessages.REMOVE_MESSAGE:
      const newData = state.data.filter(
        (message) => !action.data.id.includes(message.id),
      );

      return { ...state, data: [...newData] };
    default:
      return state;
  }
};

export default reducer;
