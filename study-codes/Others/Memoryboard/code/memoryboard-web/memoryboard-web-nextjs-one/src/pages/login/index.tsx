import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import isAuthenticated from 'service/isAuthenticated';

import LoginGrid from '@components/login/LoginGrid';
import { generalConfigs } from '@configs/general';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <Head>
        <title>Login | {generalConfigs.APP_NAME}</title>
      </Head>

      <LoginGrid />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const refreshToken = cookies[`@${generalConfigs.APP_NAME}.refreshToken`];

  if (!refreshToken) {
    return { props: {} };
  }

  const isAuth = await isAuthenticated(refreshToken);

  if (isAuth.status === true) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return { props: {} };
};
