import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { AuthAndDataContext } from '@contexts/AuthAndDataContext';

import { Container } from './styles';

interface IFormData {
  usernameOrEmail: string;
  unencryptedPassword: string;
}

export const LoginForm: React.FC = () => {
  const { handleSubmit, register } = useForm();

  const { signIn } = useContext(AuthAndDataContext);

  const handleSingIn = async (data: IFormData) => {
    if (!/@/.test(data.usernameOrEmail)) {
      await signIn({
        usernameOrEmail: '@' + data.usernameOrEmail,
        unencryptedPassword: data.unencryptedPassword,
      });
    } else {
      await signIn(data);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSingIn)}>
        <input
          {...register('usernameOrEmail')}
          type="username"
          name="usernameOrEmail"
          placeholder="Username or Email"
        />

        <input
          {...register('unencryptedPassword')}
          type="password"
          name="unencryptedPassword"
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>
    </Container>
  );
};
