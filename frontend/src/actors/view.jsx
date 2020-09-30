import { Button, Card, FormLabel, Grid, TextField, Select, MenuItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Actors as actions } from './actions';
import { Actors as api } from './api';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_SEVERITY } from 'util/alertSeverity';
import { VIEW_MESSAGE } from 'util/viewMessage';

export function Actor() {
  const actor = useSelector(state => state.actor);
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [loading, setLoading] = useState(null);

  const setValue = (key, val) => dispatch(actions.setValue(key, val));

  function handleResult(result) {
    if (result === 200) {
      setSeverity(ALERT_SEVERITY.SUCCESS);
      setMessage(VIEW_MESSAGE.SAVE_SUCCESS);
    }
  }

  function handleError(e) {
    setSeverity(ALERT_SEVERITY.ERROR);
    setMessage(`Error: ${e.message}`);
  }

  function save() {
    const call = actor.id ? api.update : api.create;
    setMessage(null);
    setLoading(true);
    call(actor).then(handleResult).catch(handleError).finally(setLoading);
  }

  const alert = message ? <Alert severity={severity}>{message}</Alert> : null;

  return (
    <>
      <Card>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
        >
          <FormLabel>Actor</FormLabel>
          <TextField
            value={actor.name}
            onChange={({ target: { value }}) => setValue('name', value)}
            label='name'
            variant='outlined'
          />
          <TextField
            value={actor.pnumber}
            onChange={({ target: { value }}) => setValue('pnumber', value)}
            type="number"
            label='pnumber'
            variant='outlined'
          />
          <TextField
            value={actor.birth}
            onChange={({ target: { value }}) => setValue('birth', value)}
            type="datetime-local"
            label='birth date'
            variant='outlined'
          />
          <TextField
            value={actor.height}
            onChange={({ target: { value }}) => setValue('height', value)}
            type="number"
            label='height'
            variant='outlined'
          />
          <Select
            value={actor.sex}
            onChange={({ target: { value }}) => setValue('sex', value)}
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
          <Button
            onClick={save}
            variant='contained'
            color='primary'
          >
            Save
          </Button>
        </Grid>
      </Card>
      {alert}
    </>
  );
}
