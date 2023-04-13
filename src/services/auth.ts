import { auth } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';

auth.languageCode = 'es';

interface RegisterProps {
  registerEmail: string;
  registerPassword: string;
  displayName: string;
}

interface LoginProps {
  loginEmail: string;
  loginPassword: string;
}

export async function registerWithEmail({
  registerEmail,
  registerPassword,
  displayName,
}: RegisterProps) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    );
    await updateProfile(user, { displayName });
    await sendEmailVerification(user);
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function loginWithEmail({ loginEmail, loginPassword }: LoginProps) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function logOut() {
  try {
    auth.signOut();
  } catch (error) {
    return { error };
  }
}
