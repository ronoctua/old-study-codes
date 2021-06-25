import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import isAuthenticated from 'service/isAuthenticated';

import { DashboardGridOne } from '@components/dashboard/DashboardGridOne';
import { generalConfigs } from '@configs/general';

export default function Dashboard(): JSX.Element {
  useEffect(() => {
    //
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | {generalConfigs.APP_NAME}</title>
      </Head>

      <DashboardGridOne />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const refreshToken = cookies[`@${generalConfigs.APP_NAME}.refreshToken`];
  const isAuth = await isAuthenticated(refreshToken);

  if (isAuth.status === false) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        // user: isAuth.user,
      },
    };
  }
};
