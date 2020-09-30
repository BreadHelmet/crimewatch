import { Button, Card, FormLabel, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Events as actions } from 'events/actions';
import { EventsApi } from 'events/api';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ALERT_SEVERITY = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
};

export function Event() {
  const event = useSelector(state => state.event);
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [loading, setLoading] = useState(null);

  const setValue = (key, val) => dispatch(actions.setEventValue(key, val));

  function handleResult(result) {
    if (result === 200) {
      setSeverity(ALERT_SEVERITY.SUCCESS);
      setMessage('Event saved successfully');
    }
  }

  function handleError(e) {
    setSeverity(ALERT_SEVERITY.ERROR);
    setMessage(`Error: ${e.message}`);
  }

  function save() {
    const call = event.id ? EventsApi.update : EventsApi.create;
    setMessage(null);
    setLoading(true);
    call(event).then(handleResult).catch(handleError).finally(setLoading);
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
        <FormLabel>Event</FormLabel>
        <TextField
          value={event.title}
          onChange={({ target: { value }}) => setValue('title', value)}
          label='title'
          variant='outlined'
        />
        <TextField
          value={event.description}
          onChange={({ target: { value }}) => setValue('description', value)}
          rows={8}
          multiline
          label='description'
          variant='outlined'
        />
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
