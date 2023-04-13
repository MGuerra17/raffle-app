import AuthValidator from '@/components/auth/AuthValidator';
import { AuthContextProvider } from '@/contexts/auth';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AuthValidator>
        <Component {...pageProps} />
      </AuthValidator>
    </AuthContextProvider>
  );
}
