import { CircularProgress } from '@material-ui/core';
import { Events as actions } from 'events/actions';
import { EventsApi } from 'events/api';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncableState } from 'util/useAsyncableState';

export function EventsProvider({ id, children }) {
  const [loading, setLoading] = useAsyncableState(true);
  const [error, setError] = useAsyncableState(null);
  const dispatch = useDispatch();
  function setEvents(events) {
    dispatch(actions.setEvents(events));
  }
  function setEvent(event) {
    dispatch(actions.setEvent(event));
  }
  const handleResult = id ? setEvent : setEvents;

  useEffect(() => {
    EventsApi.read(id).then(handleResult).catch(setError).finally(setLoading);
  }, [id, handleResult, setError, setLoading]);

  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) {
    return <CircularProgress />;
  }

  return children;
}
