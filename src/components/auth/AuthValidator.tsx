import { useAuthContext } from '@/contexts/auth';
import { useRouter } from 'next/router';

const PROTECTED_PATHS = ['/dashboard', '/test'];

interface AuthValidatorProps {
  children: JSX.Element;
}
export default function AuthValidator({ children }: AuthValidatorProps): JSX.Element {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const currentPath = router.pathname;
  const { path } = router.query;
  const isProtectedRoute =
    currentPath != '/' && PROTECTED_PATHS.some((path) => path.startsWith(currentPath));
  const isVerified = user?.emailVerified;

  const redirectTo = (path: string) => {
    router.push(path);
    return <></>;
  };

  if (isProtectedRoute && loading) return <div>...loading</div>;
  if (currentPath == '/login' && loading) return <div>...loading</div>;
  if (currentPath == '/validate' && loading) return <div>...loading</div>;
  if (isProtectedRoute && !user) return redirectTo(`/login?path=${currentPath}`);
  if (isProtectedRoute && !isVerified) return redirectTo('/validate');
  if (path && isVerified) return redirectTo(path as string);
  if (currentPath == '/login' && user && !isVerified) return redirectTo('/validate');
  if (currentPath == '/login' && isVerified) return redirectTo('/dashboard');
  if (currentPath == '/validate' && isVerified) return redirectTo('/dashboard');
  if (currentPath == '/validate' && !user) return redirectTo('/');
  return children;
}
