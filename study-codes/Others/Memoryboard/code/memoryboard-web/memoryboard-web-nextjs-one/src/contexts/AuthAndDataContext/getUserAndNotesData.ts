import { destroyCookie } from 'nookies';

import { generalConfigs } from '@configs/general';
import { appApi } from '@shared/apis/appApi';
import { initialUserData } from '@typifications/user';

const getUserAndNotesData = async () => {
  try {
    const userResponse = await appApi.get('/users/user/profile/token');
    const notesResponse = await appApi.get('/notes/user');

    return {
      isRequestSuccessful: true,
      user: userResponse.data,
      userNotes: notesResponse.data,
    };
  } catch (error) {
    destroyCookie(undefined, `@${generalConfigs.APP_NAME}.refreshToken`);

    return {
      isRequestSuccessful: false,
      user: initialUserData,
      userNotes: '',
    };
  }
};

export default getUserAndNotesData;
