import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncableState } from 'util/useAsyncableState';
import { Actors as actions } from './actions';
import { Actors as api } from './api';

export function ActorsProvider({ id, children }) {
  const [loading, setLoading] = useAsyncableState(true);
  const [error, setError] = useAsyncableState(null);
  const dispatch = useDispatch();
  function setActors(actors) {
    dispatch(actions.setActors(actors));
  }
  function setActor(actor) {
    dispatch(actions.setActor(actor));
  }
  const handleResult = id ? setActor : setActors;

  useEffect(() => {
    api.read(id).then(handleResult).catch(setError).finally(setLoading);
  }, [id, handleResult, setError, setLoading]);

  if (error) {
    console.log('error');
    return <div>{error.message}</div>
  }

  if (loading) return null;

  return children;
}
