import {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
} from '@/services/auth';
import { useState } from 'react';

export default function Login() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const displayName = name + ' ' + lastname;
    await registerWithEmail({
      registerEmail,
      registerPassword,
      displayName,
    });
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await loginWithEmail({ loginEmail, loginPassword });
  };

  return (
    <div>
      <button className='bg-blue-500' onClick={loginWithGoogle}>
        Login Google
      </button>
      <form onSubmit={handleRegister} className='flex flex-col'>
        <label htmlFor='name'>Nombre</label>
        <input
          className='border'
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
        />
        <label htmlFor='lastname'>Apellido</label>
        <input
          className='border'
          type='text'
          name='lastname'
          id='lastname'
          value={lastname}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setLastname(e.currentTarget.value)
          }
        />
        <label htmlFor='email'>Email</label>
        <input
          className='border'
          type='text'
          name='email'
          id='email'
          value={registerEmail}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setRegisterEmail(e.currentTarget.value)
          }
        />
        <label htmlFor='password'>Contrasena</label>
        <input
          className='border'
          type='text'
          name='password'
          id='password'
          value={registerPassword}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setRegisterPassword(e.currentTarget.value)
          }
        />
        <button>Send</button>
      </form>
      <form onSubmit={handleLogin} className='flex flex-col'>
        <label htmlFor='loginEmail'>Email</label>
        <input
          className='border'
          type='text'
          name='loginEmail'
          id='loginEmail'
          value={loginEmail}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setLoginEmail(e.currentTarget.value)
          }
        />
        <label htmlFor='loginPassword'>Contrasena</label>
        <input
          className='border'
          type='text'
          name='loginPassword'
          id='loginPassword'
          value={loginPassword}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setLoginPassword(e.currentTarget.value)
          }
        />
        <button>Send</button>
      </form>
    </div>
  );
}
