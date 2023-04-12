import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/config/firebase';
import { useRouter } from 'next/router';

const PROTECTED_ROUTES = ['/dashboard'];

interface AuthValidatorProps {
  children: JSX.Element;
}
export default function AuthValidator({
  children,
}: AuthValidatorProps): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const currentRoute = router.pathname;

  if (loading) return <div>...loading</div>;
  if (!user && PROTECTED_ROUTES.includes(currentRoute)) {
    router.push('/');
    return <></>;
  } else {
    return children;
  }
}
