import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { createContext, useEffect } from 'react';

import { generalConfigs } from '@configs/general';
import { useAppDispatch } from '@redux/rootDispatch';
import { appApi } from '@shared/apis/appApi';
import { ActionTypesOfApiConfigs } from '@typifications/apiConfigs';
import { ActionTypesOfMessages } from '@typifications/message';
import { ActionTypesOfNotes, INote } from '@typifications/note';
import { ActionTypesOfUsers } from '@typifications/user';

import getNoteData from './getNoteData';
import getUserAndNotesData from './getUserAndNotesData';
import signInAndSetCookies from './signInAndSetCookies';
import updateNoteData from './updateNoteData';
import updateRefreshToken from './updateRefreshToken';

interface ISignInCredentials {
  usernameOrEmail: string;
  unencryptedPassword: string;
}

interface IAuthAndDataContext {
  signIn(data: ISignInCredentials): Promise<void>;
  refreshUserAndNotesData(): Promise<boolean>;
  updateToken(): Promise<boolean>;
  updateCurrentNote(noteId: number | null): Promise<INote | null | undefined>;
  saveNoteData(note: INote): Promise<void>;
}

export const AuthAndDataContext = createContext({} as IAuthAndDataContext);

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function signIn({
    usernameOrEmail,
    unencryptedPassword,
  }: ISignInCredentials) {
    const authResponse = await signInAndSetCookies({
      usernameOrEmail,
      unencryptedPassword,
    });

    if (authResponse.isAuthenticated === true) {
      dispatch({
        type: ActionTypesOfUsers.UPDATE_USER,
        data: authResponse.user,
      });

      router.push('/dashboard');
    } else {
      dispatch({
        type: ActionTypesOfMessages.SEND_MESSAGE,
        data: authResponse.errorMessage,
      });
    }
  }

  async function getApiConfigs() {
    const apiConfigs = await appApi.get('/configs');

    dispatch({
      type: ActionTypesOfApiConfigs.UPDATE_FILES_PATH,
      data: apiConfigs.data.filesPath,
    });
  }

  async function refreshUserAndNotesData() {
    const responseData = await getUserAndNotesData();

    if (responseData.isRequestSuccessful === true) {
      dispatch({
        type: ActionTypesOfUsers.UPDATE_USER,
        data: responseData.user,
      });

      dispatch({
        type: ActionTypesOfNotes.UPDATE_NOTES,
        data: responseData.userNotes,
      });

      return true;
    }

    router.push('/login');

    return false;
  }

  async function updateToken() {
    const updateOfToken = await updateRefreshToken();

    if (updateOfToken.isRequestSuccessful === true) return true;

    router.push('/login');

    return false;
  }

  useEffect(() => {
    const cookies = parseCookies();
    const refreshToken = cookies[`@${generalConfigs.APP_NAME}.refreshToken`];

    if (refreshToken) {
      appApi.defaults.headers.authorization = `Bearer ${refreshToken}`;

      const checkAuthLoop = setInterval(async (): Promise<void> => {
        const dataResponse = await refreshUserAndNotesData();
        const tokenResponse = await updateToken();

        await getApiConfigs();

        if (!dataResponse || !tokenResponse) {
          clearInterval(checkAuthLoop);

          router.push('/login');
        }
      }, 120000);

      (async () => {
        await getApiConfigs();
        await refreshUserAndNotesData();
        await updateToken();
      })();
    }
  });

  async function updateCurrentNote(noteId: number | null) {
    if (noteId) {
      const noteResponse = await getNoteData(noteId);

      if (noteResponse.isRequestSuccessful === true) {
        dispatch({
          type: ActionTypesOfNotes.UPDATE_CURRENT_NOTE,
          data: noteResponse.note,
        });

        return noteResponse.note;
      }

      dispatch({
        type: ActionTypesOfMessages.SEND_MESSAGE,
        data: noteResponse.errorMessage,
      });

      return null;
    }
  }

  async function saveNoteData(note: INote) {
    const updateNoteResponse = await updateNoteData(note);

    if (updateNoteResponse.isRequestSuccessful === true) {
      dispatch({
        type: ActionTypesOfNotes.UPDATE_CURRENT_NOTE,
        data: updateNoteResponse.note,
      });
    } else {
      dispatch({
        type: ActionTypesOfMessages.SEND_MESSAGE,
        data: updateNoteResponse.errorMessage,
      });
    }
  }

  return (
    <AuthAndDataContext.Provider
      value={{
        signIn,
        refreshUserAndNotesData,
        updateToken,
        updateCurrentNote,
        saveNoteData,
      }}>
      {children}
    </AuthAndDataContext.Provider>
  );
};
