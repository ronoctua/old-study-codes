/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';

import { ActionTypesOfApiConfigs } from '@typifications/apiConfigs';

export const updateFilesPath = (newFilesPath: string) =>
  action(ActionTypesOfApiConfigs.UPDATE_FILES_PATH, { newFilesPath });
