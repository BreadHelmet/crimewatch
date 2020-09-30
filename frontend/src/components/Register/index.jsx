import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { UsersApi } from 'api/users';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({loading: true});
    const { email, password } = this.state;
    if(email && password) {
      UsersApi.register(email, password)
      // registerUser(email, password)
      .then(data => {
        if (data && data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          // TODO: Redirect.
        } else {
          // TODO: Handle failed.
        }
      }).finally(() => {
        this.setState({loading: false});
      });
    }
  }

  render() {
    const { email, password, loading } = this.state;
    return (
      <>
        <h1>Register</h1>
        <RegisterForm
          email={email}
          password={password}
          onSubmit={this.onSubmit}
          onEmailChange={(email) => {this.setState({email: email})}}
          onPasswordChange={(password) => {this.setState({password: password})}}
          loading={loading}
        />
      </>
    );
  }
}

export default Register;
