import { auth } from '@/config/firebase';
import { User } from 'firebase/auth';
import { createContext, useContext } from 'react';
import { useIdToken } from 'react-firebase-hooks/auth';

interface AuthContextProviderProps {
  children: JSX.Element;
}

interface AuthContextProps {
  user: User | null | undefined;
  loading: boolean;
}

const defaultAuthContextValue: AuthContextProps = {
  user: null,
  loading: false,
};

export const authContext = createContext(defaultAuthContextValue);

export const useAuthContext = () => useContext(authContext);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, loading] = useIdToken(auth);

  return (
    <authContext.Provider value={{ user, loading }}>
      {children}
    </authContext.Provider>
  );
}
