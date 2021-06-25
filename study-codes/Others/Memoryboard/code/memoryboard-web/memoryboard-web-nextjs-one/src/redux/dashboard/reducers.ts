import { AnyAction, Reducer } from 'redux';

import {
  IDashboardState,
  ActionTypesOfDashboard,
  IDashboard,
  initialDashboard,
} from '@typifications/dashboard';

const reducer: Reducer<IDashboardState, AnyAction & IDashboard> = (
  state = { data: { ...initialDashboard } },
  action,
) => {
  switch (action.type) {
    case ActionTypesOfDashboard.UPDATE_CURRENT_SECTION:
      const currentSectionNewContent = { ...state };
      currentSectionNewContent.data.currentSection = action.data;
      return { ...currentSectionNewContent };
    case ActionTypesOfDashboard.UPDATE_SIDEBAR_STATUS:
      const sidebarStatusNewContent = { ...state };
      sidebarStatusNewContent.data.sidebarStatus = action.data;
      return { ...sidebarStatusNewContent };
    case ActionTypesOfDashboard.UPDATE_CONSOLE_EXPANSION:
      const consoleExpansionNewContent = { ...state };
      consoleExpansionNewContent.data.consoleExpansion = action.data;
      return { ...consoleExpansionNewContent };
    case ActionTypesOfDashboard.UPDATE_NOTE_DISPLAY_TYPE:
      const currentNoteDisplayTypeNewContent = { ...state };
      currentNoteDisplayTypeNewContent.data.noteDisplayType = action.data;
      return { ...currentNoteDisplayTypeNewContent };
    default:
      return state;
  }
};

export default reducer;
