import { nanoid } from 'nanoid';
import { setCookie } from 'nookies';

import { generalConfigs } from '@configs/general';
import { appApi } from '@shared/apis/appApi';
import { IUser, initialUserData } from '@typifications/user';

interface ISignInCredentials {
  usernameOrEmail: string;
  unencryptedPassword: string;
}

interface IAuthResponse {
  data: {
    user: IUser;
    refreshToken: string;
  };
}

interface IErrorMessage {
  id: string;
  type: string;
  title: string;
  content: string;
}

interface IAuthentication {
  isAuthenticated: boolean;
  refreshToken: string;
  user: IUser;
  errorMessage: IErrorMessage | string;
}

async function signInAndSetCookies({
  usernameOrEmail,
  unencryptedPassword,
}: ISignInCredentials): Promise<IAuthentication> {
  try {
    const response: IAuthResponse = await appApi.post('/sessions/session/new', {
      usernameOrEmail,
      unencryptedPassword,
    });

    const { user, refreshToken } = response.data;

    setCookie(
      undefined,
      `@${generalConfigs.APP_NAME}.refreshToken`,
      refreshToken,
      {
        maxAge: 60 * 60 * 1, // 1 hour
        sameSite: 'none',
        secure: true,
      },
    );

    return {
      isAuthenticated: true,
      refreshToken: refreshToken,
      user: user,
      errorMessage: '',
    };
  } catch (error) {
    const errorMessage = {
      id: nanoid(),
      type: 'error',
      title: 'Authentication Error',
      content: '',
    };

    if (error.response) {
      error.response.status === 500
        ? (errorMessage.title = 'Server Error')
        : (errorMessage.content = error.response.data.message);
    } else {
      errorMessage.title = 'Network Error';
      errorMessage.content = 'Check if you are connected to the internet.';
    }

    return {
      isAuthenticated: false,
      refreshToken: '',
      user: initialUserData,
      errorMessage: errorMessage,
    };
  }
}

export default signInAndSetCookies;
