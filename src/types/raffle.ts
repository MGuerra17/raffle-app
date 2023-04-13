import { DocumentData, DocumentReference } from 'firebase/firestore';

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface RaffleNumberOwner {
  name: string;
  cellphone: string;
  paid: boolean;
}

export interface Raffle {
  id?: string;
  title: string;
  description: string;
  image: string;
  numbers?: { [raffleNumber: number]: RaffleNumberOwner };
  owner?: DocumentReference<DocumentData>;
  endDate: FirestoreTimestamp;
}
