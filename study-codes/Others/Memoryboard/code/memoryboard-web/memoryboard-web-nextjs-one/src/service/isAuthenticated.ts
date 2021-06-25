import { destroyCookie } from 'nookies';

import { generalConfigs } from '@configs/general';
import { appApi } from '@shared/apis/appApi';
import { IUser, initialUserData } from '@typifications/user';

interface IAuthenticated {
  status: boolean;
  user: IUser;
}

async function isAuthenticated(refreshToken: string): Promise<IAuthenticated> {
  if (!refreshToken) {
    return {
      status: false,
      user: initialUserData,
    };
  }

  appApi.defaults.headers.authorization = `Bearer ${refreshToken}`;

  try {
    const response = await appApi.get('/users/user/profile/token');

    if (!response) {
      destroyCookie(undefined, `@${generalConfigs.APP_NAME}.refreshToken`);

      return {
        status: false,
        user: initialUserData,
      };
    }

    if (response.data.username) {
      return {
        status: true,
        user: response.data,
      };
    }
  } catch (error) {
    console.log(error);
  }

  destroyCookie(undefined, `@${generalConfigs.APP_NAME}.refreshToken`);

  return {
    status: false,
    user: initialUserData,
  };
}

export default isAuthenticated;
