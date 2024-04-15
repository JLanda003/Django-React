import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const RoomJoinPage = () => {
  const navigate = useNavigate();
  const [roomState, setRoomState] = useState({
    roomCode: "",
    errorState: false,
    error: ''
  });

  const handleTextFieldChange = e => {
    setRoomState( data => ({
      ...data,
      roomCode: e.target.value,
    }));
  }

  const roomButtonPressed = async() => {
    const reqOptions ={
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomState.roomCode,
      }),
    };
    try {
      const response = await fetch('/api/join-room', reqOptions);
      response.ok == true
      ? navigate(`/room/${roomState.roomCode}`)
      : setRoomState({
        errorState: true,
        error: 'No se encontro la sala.'
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid
      container
      spacing={1}
    >
      <Grid
        item
        xs={12}
        align="center"
      >
        <Typography
          component="h4"
          variant="h4"
        >
          Unirse a una sala
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        <TextField
          error={ roomState.errorState }
          label="Codigo"
          placeholder="Codigo de la sala"
          value={ roomState.value }
          helperText={ roomState.error }
          variant="standard"
          onChange={ handleTextFieldChange }
        />
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        <Button
          color="secondary"
          variant="outlined"
          endIcon={ <MeetingRoomIcon /> }
          onClick={ roomButtonPressed }
        >
          Ingresar a sala
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        <Button
          color="secondary"
          variant="outlined"
          startIcon={ <ArrowBackIcon /> }
          to='/'
          component={ Link }
        >
          Regresar
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;