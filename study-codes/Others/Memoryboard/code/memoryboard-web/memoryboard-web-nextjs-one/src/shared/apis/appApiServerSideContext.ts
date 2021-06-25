import axios, { AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';

import { generalConfigs } from '@configs/general';

export function getAppApiServerSide(context: any): AxiosInstance {
  const cookies = parseCookies(context);
  const refreshToken = cookies[`@${generalConfigs.APP_NAME}.refreshToken`];

  const appApiServerSide = axios.create({
    baseURL: `${process.env.APP_API_URL}`,
  });

  if (refreshToken) {
    appApiServerSide.defaults.headers.authorization = `Bearer ${refreshToken}`;
  }

  return appApiServerSide;
}
