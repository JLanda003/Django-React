import React from "react";
import {
  Link,
} from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  ButtonGroup
} from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddBoxIcon from '@mui/icons-material/AddBox';


export default function RenderHomePage() {
  return(<>
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        xs={12}
        align="center"
      >
        <Typography
          variant="h3"
          compact="h3"
        >
          Reunion
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
      >
        <ButtonGroup
          disableElevation
          variant="outlined"
          color="secondary">
            <Button
              color="secondary"
              to="/join"
              component={ Link }
              startIcon={ <MeetingRoomIcon /> }
            >
              Entrar a una Sala
            </Button>
            <Button
              color="secondary"
              to="/create"
              component={ Link }
              endIcon={ <AddBoxIcon /> }
            >
              Crear una Sala
            </Button>
          </ButtonGroup>
      </Grid>
    </Grid>
  </>);
}