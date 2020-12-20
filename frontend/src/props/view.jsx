import { Button, Card, FormLabel, Grid, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_SEVERITY } from 'util/alertSeverity';
import { VIEW_MESSAGE } from 'util/viewMessage';
import { Props as actions } from './actions';
import { Props as api } from './api';

export function Prop() {
  const prop = useSelector(state => state.prop);
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
    const call = prop.id ? api.update : api.create;
    setMessage(null);
    setLoading(true);
    call(prop).then(handleResult).catch(handleError).finally(setLoading);
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
        <FormLabel>Prop</FormLabel>
        <TextField
          value={prop.name}
          onChange={({ target: { value }}) => setValue('name', value)}
          label='name'
          variant='outlined'
        />
        <TextField
          value={prop.description}
          onChange={({ target: { value }}) => setValue('description', value)}
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
