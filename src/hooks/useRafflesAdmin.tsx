import { useAuthContext } from '@/contexts/auth';
import { getCollectionDataFiltered, getDocumentReference } from '@/services/database';
import { Raffle } from '@/types/raffle';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function useRafflesAdmin() {
  const [raffles, setRaffles] = useState<Raffle[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newRaffleTitle, setNewRaffleTitle] = useState<string>('');
  const [newRaffleDescription, setNewRaffleDescription] = useState<string>('');
  const [newRaffleImage, setNewRaffleImage] = useState<string>('');
  const [newRaffleDate, setNewRaffleDate] = useState<string>('');

  const { user } = useAuthContext();
  const { documentRef: currentUserRef } = getDocumentReference(
    'users',
    user?.uid as string
  );

  useEffect(() => {
    getCollectionDataFiltered(
      'raffles',
      'owner',
      currentUserRef as DocumentReference<DocumentData>
    )
      .then(({ data }) => {
        const rafflesData = data?.docs.map((doc): Raffle => {
          const { title, description, image, endDate, numbers } = doc.data();
          return { id: doc.id, title, description, image, endDate, numbers };
        });
        setRaffles(rafflesData);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    user,
    raffles,
    loading,
    newRaffleTitle,
    newRaffleDescription,
    newRaffleImage,
    newRaffleDate,
    setNewRaffleTitle,
    setNewRaffleDescription,
    setNewRaffleImage,
    setNewRaffleDate,
    currentUserRef,
  };
}
