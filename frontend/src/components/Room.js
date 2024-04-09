import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomCode } = useParams();

  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  })

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const response = await fetch(`/api/get-room?code=${roomCode}`);
        if (response.ok){
          const data = await response.json();
          setRoomDetails({
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host,
          });
        } else {
          throw new Error('Error al obtener detalles de la sala');
        }
      } catch (error) {
        console.error('Error al obtener detalles de la sala: ', error);
      }
    };
    getRoomDetails();
  }, [roomCode]);

  return (
    <div>
      <h3>Codigo: {roomCode}</h3>
      <p>Votos requeridos para pasar de cancion: {roomDetails.votesToSkip}
      </p>
      <p>Reproducir/Pausar: {
          roomDetails.guestCanPause.toString() == 'true'
          ? 'Acesos autorizados'
          : 'Accesos restringidos'
        }
      </p>
      <p>Anfritión: {
          roomDetails.isHost.toString() == 'true'
          ? 'En linea'
          : 'Desconectado'
        }
      </p>
    </div>
  );
};

export default Room;