import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography
} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';


const Room = ({ leaveRoomCallBack }) => {
  const navigate = useNavigate();
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
          leaveRoomCallBack;
          navigate('/');
        }
      } catch (error) {
        console.error('Error al obtener detalles de la sala: ', error);
      }
    };
    getRoomDetails();
  }, [roomCode]);

  const leaveButtonPressed = async () =>{
    const reqOptions ={
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
    };

    try {
      const response = await fetch('/api/leave-room', reqOptions);
      if(response.ok){
        leaveRoomCallBack;
        navigate('/');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  } 

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid
        item
        xs={12} align='center'
      >
        <Typography
          variant='h4'
          component='h4'
        >
          Codigo: {roomCode}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12} align='center'
      >
        <Typography
          variant='h6'
          component='h6'
        >
          Votos requeridos para pasar de cancion: {roomDetails.votesToSkip}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12} align='center'
      >
        <Typography
          variant='h6'
          component='h6'
        >
          Reproducir/Pausar: {
            roomDetails.guestCanPause.toString() == 'true'
            ? 'Acesos autorizados'
            : 'Accesos restringidos'
          }
        </Typography>
      </Grid>
      <Grid
        item
        xs={12} align='center'
      >
        <Typography
          variant='h6'
          component='h6'
        >
          Anfritión: {
            roomDetails.isHost.toString() == 'true'
            ? 'En linea'
            : 'Desconectado'
          }
        </Typography>
      </Grid>
      <Grid
        item
        xs={12} align='center'
      >
        <Button
          color="secondary"
          variant="outlined"
          endIcon={<ExitToAppIcon />}
          onClick={leaveButtonPressed}
        >
          Dejar la sala
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;