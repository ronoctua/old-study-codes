import Head from 'next/head';

import { LoginForm } from '@components/login/LoginForm';
import { generalConfigs } from '@configs/general';

import { Container } from './styles';

function LoginGrid(): JSX.Element {
  return (
    <Container>
      <Head>
        <title>Login | {generalConfigs.APP_NAME}</title>
      </Head>

      <LoginForm />
    </Container>
  );
}

export default LoginGrid;
