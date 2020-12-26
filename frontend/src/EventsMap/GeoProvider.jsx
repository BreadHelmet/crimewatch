import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncableState } from 'util/useAsyncableState';
import { GeoActions } from './GeoActions';
import { GeoApi } from './GeoApi';

export function GeoProvider({ id, children }) {
  const [loading, setLoading] = useAsyncableState(true);
  const [error, setError] = useAsyncableState(null);
  const dispatch = useDispatch();

  function setGeo(geo) {
    dispatch(GeoActions.setGeo(geo));
  }

  const handleResult = id ? setGeo : setGeo;

  useEffect(() => {
    GeoApi.read(id).then(handleResult).catch(setError).finally(setLoading);
  }, [id, handleResult, setError, setLoading]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (loading) return null;

  return <>{children}</>;
}
