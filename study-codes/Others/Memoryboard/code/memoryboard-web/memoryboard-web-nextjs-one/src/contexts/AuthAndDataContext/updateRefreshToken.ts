import { destroyCookie, setCookie } from 'nookies';

import { generalConfigs } from '@configs/general';
import { appApi } from '@shared/apis/appApi';

const updateRefreshToken = async (): Promise<{
  isRequestSuccessful: boolean;
}> => {
  try {
    const newRefreshToken = await appApi.post(
      '/sessions/session/refresh/token',
    );

    appApi.defaults.headers.authorization = `Bearer ${newRefreshToken.data}`;

    setCookie(
      undefined,
      `@${generalConfigs.APP_NAME}.refreshToken`,
      newRefreshToken.data,
      {
        maxAge: 60 * 60 * 1, // 1 hour
        sameSite: 'none',
        secure: true,
      },
    );

    return {
      isRequestSuccessful: true,
    };
  } catch (error) {
    destroyCookie(undefined, `@${generalConfigs.APP_NAME}.refreshToken`);

    return {
      isRequestSuccessful: false,
    };
  }
};

export default updateRefreshToken;
