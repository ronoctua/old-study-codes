/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';

import { ActionTypesOfDashboard } from '@typifications/dashboard';

export const updateCurrentSection = (currentSectionName: string) =>
  action(ActionTypesOfDashboard.UPDATE_CURRENT_SECTION, { currentSectionName });

export const updateSidebarStatus = (isSidebarOpen: boolean) =>
  action(ActionTypesOfDashboard.UPDATE_SIDEBAR_STATUS, { isSidebarOpen });

export const updateConsoleExpansion = (isConsoleExpanded: boolean) =>
  action(ActionTypesOfDashboard.UPDATE_CONSOLE_EXPANSION, {
    isConsoleExpanded,
  });

export const updateNoteDisplayType = (noteDisplayType: string) =>
  action(ActionTypesOfDashboard.UPDATE_NOTE_DISPLAY_TYPE, { noteDisplayType });
