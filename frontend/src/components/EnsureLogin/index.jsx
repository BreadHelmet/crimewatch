import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from 'components/Login';

export function EnsureLogin({ children }) {
  const loggedIn = useSelector(state => state.loggedIn);

  // console.log('in ensure login.', { loggedIn });

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route render={() => (loggedIn ? children : null)} />
    </Switch>
  );
}

EnsureLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EnsureLogin;
