import React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Link } from 'react-router-dom';

const CreateRoomPage = () => {
  const defaultVotes = 2;

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
          <RadioGroup row defaultValue="true">
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
            defaultValue={defaultVotes}
            inputProps={{
              min: 1,
              style: { textAlign:"center" },
            }}
          />
          <FormHelperText>
            <span align="center">
              Votos requeridos para pasar de cancion
            </span>
          </FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default CreateRoomPage