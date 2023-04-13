import { useAuthContext } from '@/contexts/auth';
import { logOut } from '@/services/auth';

export default function Validate() {
  const { user } = useAuthContext();
  return (
    <div className='flex flex-col'>
      Se ha enviado un correo de validacion a: {user?.email}
      <button className='bg-red-400' onClick={logOut}>
        Cerrar sesion
      </button>
    </div>
  );
}
