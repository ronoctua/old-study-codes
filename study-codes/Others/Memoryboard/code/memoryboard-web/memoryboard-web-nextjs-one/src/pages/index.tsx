import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import isAuthenticated from 'service/isAuthenticated';

import { generalConfigs } from '@configs/general';

export default function Home(): JSX.Element {
  return (
    <Head>
      <title>HOME</title>
    </Head>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const refreshToken = cookies[`@${generalConfigs.APP_NAME}.refreshToken`];
  const isAuth = await isAuthenticated(refreshToken);

  if (!isAuth || isAuth.status === false) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
};
