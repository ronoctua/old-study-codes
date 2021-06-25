export enum ActionTypesOfDashboard {
  UPDATE_CURRENT_SECTION = '@dashboard/UPDATE_CURRENT_SECTION',
  UPDATE_SIDEBAR_STATUS = '@dashboard/UPDATE_SIDEBAR_STATUS',
  UPDATE_CONSOLE_EXPANSION = '@dashboard/UPDATE_CONSOLE_EXPANSION',
  UPDATE_NOTE_DISPLAY_TYPE = '@dashboard/UPDATE_NOTE_DISPLAY_TYPE',
}

export interface IDashboard {
  currentSection: string;
  sidebarStatus: boolean;
  consoleExpansion: boolean;
  noteDisplayType: string;
}

export interface IDashboardState {
  readonly data: IDashboard;
}

export const initialDashboard = {
  currentSection: 'Notes',
  sidebarStatus: false,
  consoleExpansion: false,
  noteDisplayType: 'realtime',
};
