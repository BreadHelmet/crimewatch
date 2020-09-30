import { UsersApi } from 'api/users';
import { Login } from 'components/Login';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Links } from 'util/links';
import { useAsyncableState } from 'util/useAsyncableState';

export function EnsureLogin({ children }) {

  const history = useHistory();
  const loggedIn = useSelector(state => state.loggedIn);
  const [loading, setLoading] = useAsyncableState(true);//useState(true);

  useEffect(() => {
    setLoading(true);
    console.log('calling UsersApi.auth')
    UsersApi.auth().finally(setLoading);
  }, [setLoading]);

  // useEffect(() => {
  //   console.log('loggedIn changed to', loggedIn);
  // }, [loggedIn]);

  useEffect(() => {
    console.log('loggedIn:', loggedIn);
    if (!loggedIn && !loading) {
      console.log('redirecting to login');
      history.push(Links.LOGIN);
    }
  }, [loggedIn, history, loading]);

  return (
    <Switch>
      <Route path={Links.LOGIN} component={Login} />
      <Route>{() => loggedIn ? children : null}</Route>
    </Switch>
  );
}

EnsureLogin.propTypes = {
  children: PropTypes.node,
  // loggedIn: PropTypes.bool.isRequired,
};

EnsureLogin.defaultProps = {
  children: null,
};

// const mapStateToProps = state => ({
//   loggedIn: state.loggedIn,
// });

// export default connect(mapStateToProps)(EnsureLogin);
