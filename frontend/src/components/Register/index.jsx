import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../api/user';

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
    // console.log('onSubmit');
    this.setState({loading: true});
    const { email, password } = this.state;
    if(email && password) {
      // console.log('email && password');
      registerUser(email, password)
      .then(data => {
        // console.log(data);
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
