import { logOut } from '@/services/auth';
import useRafflesAdmin from '@/hooks/useRafflesAdmin';
import { Raffle } from '@/types/raffle';
import { Timestamp } from 'firebase/firestore';
import { createRaffle } from '@/services/database';

export default function Dashboard() {
  const {
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
  } = useRafflesAdmin();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data: Raffle = {
      title: newRaffleTitle as string,
      description: newRaffleDescription as string,
      image: newRaffleImage as string,
      endDate: Timestamp.fromDate(new Date(newRaffleDate as string)),
      owner: currentUserRef,
    };
    const { docRef } = await createRaffle(data);
    console.log(docRef);
  };

  return (
    <div className='flex flex-col'>
      <h1>Bienvenido(a) {user?.displayName}</h1>
      <img
        src={user?.photoURL as string}
        width={100}
        height={100}
        referrerPolicy='no-referrer'
      />
      <button className='bg-red-500' onClick={logOut}>
        Logout
      </button>
      <h1>Crear nueva rifa</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Titulo</label>
        <input
          type='text'
          name='title'
          id='title'
          value={newRaffleTitle}
          onChange={(e) => setNewRaffleTitle(e.currentTarget.value)}
        />
        <label htmlFor='description'>Descripcion</label>
        <input
          type='text'
          name='description'
          id='description'
          value={newRaffleDescription}
          onChange={(e) => setNewRaffleDescription(e.currentTarget.value)}
        />
        <label htmlFor='image'>URL de imagen</label>
        <input
          type='text'
          name='image'
          id='image'
          value={newRaffleImage}
          onChange={(e) => setNewRaffleImage(e.currentTarget.value)}
        />
        <label htmlFor='endDate'>Fecha de rifa</label>
        <input
          type='date'
          name='endDate'
          id='endDate'
          value={newRaffleDate}
          onChange={(e) => setNewRaffleDate(e.currentTarget.value)}
        />
        <button className='bg-emerald-200 p-2 rounded-md'>Crear</button>
      </form>
      {loading ? (
        <div>...cargando</div>
      ) : (
        <ul>
          {raffles?.map(({ id, title, image, endDate }) => (
            <li key={id}>
              <img src={image} width={100} height={100} />
              {title}
              {endDate && (
                <p>End date: {new Date(endDate.seconds * 1000).toISOString()}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
