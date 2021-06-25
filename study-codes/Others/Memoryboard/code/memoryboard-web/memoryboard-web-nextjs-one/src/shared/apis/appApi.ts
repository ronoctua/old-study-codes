import axios from 'axios';
import { parseCookies } from 'nookies';

import { generalConfigs } from '@configs/general';

const cookies = parseCookies();
const refreshToken = cookies[`@${generalConfigs.APP_NAME}.refreshToken`];

export const appApi = axios.create({
  baseURL: `${process.env.APP_API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

if (refreshToken) {
  appApi.defaults.headers.authorization = `Bearer ${refreshToken}`;
}
