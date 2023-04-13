import {
  DocumentReference,
  DocumentData,
  collection,
  getDocs,
  addDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { database } from '@/config/firebase';
import { Raffle } from '@/types/raffle';

export function getDocumentReference(collectionId: string, documentId: string) {
  try {
    const documentRef = doc(database, collectionId, documentId);
    return { documentRef };
  } catch (error) {
    return { error };
  }
}

export async function getCollectionData(collectionName: string) {
  try {
    const data = await getDocs(collection(database, collectionName));
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function getCollectionDataFiltered(
  collectionName: string,
  field: string,
  condition: string | DocumentReference<DocumentData>
) {
  try {
    const q = query(collection(database, collectionName), where(field, '==', condition));
    const data = await getDocs(q);
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function createRaffle(data: Raffle) {
  try {
    const docRef = await addDoc(collection(database, 'raffles'), data);
    return { docRef };
  } catch (error) {
    return { error };
  }
}
