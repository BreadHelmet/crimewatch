import React from 'react'
import PropTypes from 'prop-types'
import LoadingIndicator from '../../../components/LoadingIndicator';
import EmailInput from '../../../components/input/text/email';
import PasswordInput from '../../../components/input/text/password';
import SubmitButton from '../../../components/input/button/SubmitButton';

function LoginForm({email, password, onSubmit, onEmailChange, onPasswordChange, loading}) {
  return (
    <form className="user-form" onSubmit={e => onSubmit(e)}>
      {/* <label htmlFor="">
        <span>Email</span>
        <input
          disabled={loading}
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          type="email"
          name="email"
          id="email"
        />
      </label> */}
      <EmailInput
        value={email}
        onChange={onEmailChange}
        readOnly={loading}
      />
      <PasswordInput
        value={password}
        onChange={onPasswordChange}
        readOnly={loading}
      />
      <SubmitButton loading={loading} />
      {/* <label htmlFor="">
        <span>Password</span>
        <input
          disabled={loading}
          value={password}
          onChange={e => onPasswordChange(e.target.value)}
          type="password"
          name="password"
          id="password"
        />
      </label> */}

      {/* <button disabled={loading} type="submit">
        Login
        <LoadingIndicator />
      </button> */}
    </form>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginForm;
