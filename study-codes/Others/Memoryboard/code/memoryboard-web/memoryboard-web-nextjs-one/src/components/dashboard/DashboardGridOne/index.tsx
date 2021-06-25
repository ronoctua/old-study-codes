import React from 'react';
import { HiChevronDoubleRight, HiChevronDoubleLeft } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { Console } from '@components/console/Console';
import { Editor } from '@components/editor/Editor';
import { Menu } from '@components/menu/Menu';
import { NoteData } from '@components/notes/NoteData';
import { NoteSaveButton } from '@components/notes/NoteSaveButton';
import { NotesTree } from '@components/notes/NotesTree';
import { NoteUserImagesList } from '@components/notes/NoteUserImagesList';
import { TopBarGrid } from '@components/topBar/TopBarGrid';
import { useAppDispatch } from '@redux/rootDispatch';
import { StateType } from '@redux/rootTypes';
import { ActionTypesOfDashboard } from '@typifications/dashboard';

import { Container } from './styles';

const DashboardGridOne: React.FC = () => {
  const dispatch = useAppDispatch();

  const isSidebarHide = useSelector(
    (state: StateType) => state.dashboard.data.sidebarStatus,
  );

  const currentSection = useSelector(
    (state: StateType) => state.dashboard.data.currentSection,
  );

  const currentNote = useSelector(
    (state: StateType) => state.notes.data.currentNote,
  );

  const hideOrShowSidebar = () => {
    const sidebarStatus = isSidebarHide ? false : true;

    dispatch({
      type: ActionTypesOfDashboard.UPDATE_SIDEBAR_STATUS,
      data: sidebarStatus,
    });
  };

  return (
    <Container>
      <div id="top-bar">
        <TopBarGrid />
      </div>

      <div id="content-after-top-bar">
        <div id="main">
          <div id="target-content">
            <div id="editor">
              <Editor />
            </div>
          </div>

          <div id="bottom-bar">
            <div id="note-bar">
              {currentNote && currentSection === 'Notes' && (
                <>
                  {/* <div id="save-button">
                    <NoteSaveButton />
                  </div> */}

                  <div id="console">
                    <Console />
                  </div>

                  <div id="user-list">
                    <NoteUserImagesList />
                  </div>
                </>
              )}

              <div
                className={
                  'sidebar-button bottom-bar-sidebar-button ' +
                  (isSidebarHide ? 'hide' : '')
                }>
                <button onClick={hideOrShowSidebar} title="Show sidebar">
                  <HiChevronDoubleLeft />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="sidebar" className={isSidebarHide ? '' : 'hide'}>
          <div id="target-list">
            <NotesTree />
          </div>

          <div id="target-info">
            <NoteData />
          </div>

          <div id="navigation">
            <div className="sidebar-button">
              <button onClick={hideOrShowSidebar} title="Hide sidebar">
                <HiChevronDoubleRight />
              </button>
            </div>
            <div id="navigation-menu">
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { DashboardGridOne };
