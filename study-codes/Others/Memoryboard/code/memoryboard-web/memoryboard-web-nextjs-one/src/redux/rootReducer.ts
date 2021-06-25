import { combineReducers } from 'redux';

import apiConfigs from '@redux/apiConfigs/reducers';
import dashboard from '@redux/dashboard/reducers';
import messages from '@redux/messages/reducers';
import notes from '@redux/notes/reducers';
import socketConnection from '@redux/socketConnection/reducers';
import users from '@redux/users/reducers';

export default combineReducers({
  apiConfigs,
  dashboard,
  messages,
  notes,
  socketConnection,
  users,
});
