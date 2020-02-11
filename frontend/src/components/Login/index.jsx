import React, { useState, useEffect } from 'react';
import './style.css';
import { logIn } from '../../api/user';
import { Link } from 'react-router-dom';
import EmailInput from '../../components/input/text/email';
import PasswordInput from '../../components/input/text/password';
import SubmitButton from '../../components/input/button/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../../redux/actions/login';

// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';

// import { Redirect } from 'react-router-dom';


export function Login({ history }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  //const [shouldRedirect, setShouldRedirect] = useState(false);

  const loggedIn = useSelector(state => state.loggedIn.loggedIn);

  const dispatch = useDispatch();

  console.log({ loggedIn });


  useEffect(() => {
    if (loggedIn && !loading) {
      history.push('/dashboard');
      // return () => {
      //   // cleanup
      // };
    }
  }, [loggedIn, loading, history]);
  

  function onSubmit(e) {
    if (email && password) {
      setError(null);
      setLoading(true);
      logIn(email, password).then(data => {
        if (data && data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          // console.log('setting loggedIn true');
          dispatch(setLoggedIn(true));
          setError(null);
        } else {
          // console.log('setting loggedIn false');
          dispatch(setLoggedIn(false));
        }
      }).finally(() => setLoading(false));
    } else {
      setError('To log in, please enter email and password');
    }
  }

  // if (loggedIn) {
  //   console.log('logged in true');
  //   return <Redirect to='/incidents' />;
  // } else {
  //   console.log('logged in false');
    return (
    <div className="login">
      <div className="error">{error}</div>
      <div className="user-form">
        <h1>Login</h1>
        <EmailInput
          value={email}
          onChange={setEmail}
          readOnly={loading}
        />
        <PasswordInput
          value={password}
          onChange={setPassword}
          readOnly={loading}
        />
        <SubmitButton
          onClick={onSubmit}
          loading={loading}
        />
        <Link to="/incidents">Incidents</Link>
      </div>
    </div>
    )
  // }
}

// Login.PropTypes = {
//   history: 
// };

export default Login;
