import React, { useState } from 'react'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Link, useNavigate } from 'react-router-dom';

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const defaultVotes = 1;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);

  const handleVotesChange = e => {
    setVotesToSkip(e.target.value);
  }

  const handleGuestCanPauseChange = e => {
    setGuestCanPause(e.target.value === 'true' ? true : false)
  }

  const handleRoomButtonPressed = async() => {
    const reqOptions ={
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    try {
      const response = await fetch('/api/create-room', reqOptions);
      const data = await response.json();
      data && data.code ? navigate(`/room/${data.code}`) : undefined;
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
        xs={12}
        align="center"
      > 
        <Typography component='h4' variant='h4'>
          Crear una nueva sala
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        <FormControl component='fieldset'>
          <FormHelperText>
            <span align="center">
              Contol de invitados
            </span>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value='true'
              control={<Radio color='primary' />}
              label='Reproducir/Pausar'
              labelPlacement='bottom'
            />
            <FormControlLabel
              value='false'
              control={<Radio color='secondary' />}
              label='Sin control'
              labelPlacement='bottom'
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        <FormControl component='fieldset'>
          <TextField
            required={true}
            type='number'
            onChange={handleVotesChange}
            defaultValue={defaultVotes}
            inputProps={{
              min: 1,
              style: { textAlign:"center" },
            }}
            variant="standard"
            color="secondary"
          />
          <FormHelperText>
            <span align="center">
              Votos requeridos para pasar de cancion
            </span>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        <Button
          color="secondary"
          variant="outlined"
          startIcon={<SaveAsIcon />}
          onClick={handleRoomButtonPressed}
        >
          Crear una sala
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
          startIcon={<ArrowBackIcon />}
          to='/'
          component={Link}
        >
          Regresar
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateRoomPage