import React, { useEffect, useState } from 'react'

const Room = ({match}) => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  })

  const roomCode = match.params.roomCode;

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
      <h3>{roomCode}</h3>
      <p>Votes: {roomDetails.votesToSkip}</p>
      <p>Guest Can Pause: {roomDetails.guestCanPause.toString()}</p>
      <p>Host: {roomDetails.isHost.toString()}</p>
    </div>
  );
};

export default Room;