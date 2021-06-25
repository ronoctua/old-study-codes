/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';

import { ActionTypesOfMessages, IMessage } from '@typifications/message';

export const sendMessage = (message: IMessage) =>
  action(ActionTypesOfMessages.SEND_MESSAGE, { message });

export const removeMessage = (message: IMessage) =>
  action(ActionTypesOfMessages.REMOVE_MESSAGE, { message });
