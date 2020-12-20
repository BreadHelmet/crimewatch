import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncableState } from 'util/useAsyncableState';
import { Scenes as actions } from './actions';
import { Scenes as api } from './api';

export function ScenesProvider({ id, children }) {
  const [loading, setLoading] = useAsyncableState(true);
  const [error, setError] = useAsyncableState(null);
  const dispatch = useDispatch();
  function setScenes(scenes) {
    dispatch(actions.setScenes(scenes));
  }
  function setScene(scene) {
    dispatch(actions.setScene(scene));
  }
  const handleResult = id ? setScene : setScenes;

  useEffect(() => {
    api.read(id).then(handleResult).catch(setError).finally(setLoading);
  }, [id, handleResult, setError, setLoading]);

  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) return null;

  return children;
}
