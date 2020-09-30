import { UsersApi } from 'api/users';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login as actions } from 'redux/actions/login/index';
import { Button, Grid, TextField } from '@material-ui/core';

export function Login({ history }) {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loggedIn = useSelector(state => state.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn && !loading) {
      history.push('/dashboard');
    }
  }, [loggedIn, loading, history]);

  function dispatchLogin(response) {
    console.log({ response });
    console.log('login returned, logging in')
    dispatch(actions.login());
  }

  function login() {
    if (email && password) {
      setError(null);
      setLoading(true);
      UsersApi.login(email, password).then(dispatchLogin).catch(setError).finally(setLoading);
    } else {
      setError('To log in, please enter email and password');
    }
  }
  return (
    <div className="login">
      <div className="error">{error?.message}</div>
      <div className="user-form">
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <h2>Login</h2>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={({ target: { value }}) => setEmail(value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={({ target: { value }}) => setPassword(value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={login}
          >
            Login
          </Button>
        </Grid>
      </div>
    </div>
  );
}
