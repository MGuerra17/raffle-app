import { auth } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';

export async function registerWithEmail(email: string, password: string) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    sendEmailVerification(user);
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
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
