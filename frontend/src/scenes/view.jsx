import { Button, Card, FormLabel, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Scenes as actions } from './actions';
import { Scenes as api } from './api';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_SEVERITY } from 'util/alertSeverity';
import { VIEW_MESSAGE } from 'util/viewMessage';

export function Scene() {
  const scene = useSelector(state => state.scene);
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
    const call = scene.id ? api.update : api.create;
    setMessage(null);
    setLoading(true);
    call(scene).then(handleResult).catch(handleError).finally(setLoading);
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
        <FormLabel>Scene</FormLabel>
        <TextField
          value={scene.title}
          onChange={({ target: { value }}) => setValue('title', value)}
          label='title'
          variant='outlined'
        />
        <TextField
          value={scene.description}
          onChange={({ target: { value }}) => setValue('description', value)}
          rows={8}
          multiline
          label='description'
          variant='outlined'
        />
        <TextField
          value={scene.lon}
          onChange={({ target: { value }}) => setValue('lon', value)}
        />
        <TextField
          value={scene.lat}
          onChange={({ target: { value }}) => setValue('lat', value)}
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
