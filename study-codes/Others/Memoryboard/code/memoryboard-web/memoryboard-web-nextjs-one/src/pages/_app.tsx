import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';

import { MessagesContainer } from '@components/messages/MessagesContainer';
import { AuthProvider } from '@contexts/AuthAndDataContext';
import { SocketProvider } from '@contexts/SocketContext';
import { ThemeProvider } from '@contexts/ThemeContext';
import store from '@redux/rootStore';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <SocketProvider>
          <ThemeProvider>
            <Component {...pageProps} />
            <MessagesContainer />
          </ThemeProvider>
        </SocketProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}

export default MyApp;
