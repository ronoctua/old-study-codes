import { createContext, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { auth, firebase } from '@shared/services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

export type AuthContextType = {
  user: User | undefined | any;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          toast.error('Missing photo from Google Account.');

          return;
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        toast.error('Missing photo from Google Account.');

        return;
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  async function logout() {
    await firebase.auth().signOut();
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
