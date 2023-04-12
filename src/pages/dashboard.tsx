import { logOut } from '@/services/auth';

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <button className='bg-red-500' onClick={logOut}>
        Logout
      </button>
    </div>
  );
}
