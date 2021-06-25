/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';

import { ActionTypesOfUsers, IUser } from '@typifications/user';

export const updateUser = (userData: IUser) =>
  action(ActionTypesOfUsers.UPDATE_USER, { userData });

export const removeUser = (user: IUser) =>
  action(ActionTypesOfUsers.REMOVE_USER, { user });
