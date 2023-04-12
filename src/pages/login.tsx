import { auth } from '@/config/firebase';
import { logOut, loginWithGoogle, registerWithEmail } from '@/services/auth';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = await registerWithEmail(email, password);
    console.log(user);
  };
  const { currentUser } = auth;
  console.log({ currentUser });
  return (
    <div>
      <button className='bg-blue-500' onClick={loginWithGoogle}>
        Login Google
      </button>
      <button className='bg-red-500' onClick={logOut}>
        Logout
      </button>
      <form onSubmit={handleSubmit}>
        <input
          className='border'
          type='text'
          name='email'
          id='email'
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setEmail(e.currentTarget.value)
          }
        />
        <input
          className='border'
          type='text'
          name='password'
          id='password'
          value={password}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
        />
        <button>Send</button>
      </form>
    </div>
  );
}
