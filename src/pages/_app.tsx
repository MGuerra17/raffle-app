import AuthValidator from '@/components/auth/AuthValidator';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthValidator>
      <Component {...pageProps} />
    </AuthValidator>
  );
}
