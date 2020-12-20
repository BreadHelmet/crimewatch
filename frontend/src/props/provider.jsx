import { Props as actions } from './actions';
import { Props as api } from './api';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAsyncableState } from 'util/useAsyncableState';

export function PropsProvider({ id, children }) {
  const [loading, setLoading] = useAsyncableState(true);
  const [error, setError] = useAsyncableState(null);
  const dispatch = useDispatch();
  function setProps(props) {
    dispatch(actions.setProps(props));
  }
  function setProp(prop) {
    dispatch(actions.setProp(prop));
  }
  const handleResult = id ? setProp : setProps;

  useEffect(() => {
    api.read(id).then(handleResult).catch(setError).finally(setLoading);
  }, [id, handleResult, setError, setLoading]);

  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) return null;

  return children;
}
