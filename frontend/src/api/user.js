
// export const login(username, password) => ();
import { AuthPath, HttpRequests } from './variables.js';

export const logIn = (email, password) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const body = JSON.stringify({
    email,
    password,
    grant_type: 'password',
  });
  const init = {
    method: HttpRequests.POST,
    headers,
    body,
  };
  const request = new Request(AuthPath.LOGIN, init);

  return fetch(request)
  .then(response => {
    if (response.ok) {
      return response;
    }
    if (response.status >= 400) {
      throw new Error('Error:'+response.status);
    }
    return response;
  })
  .then(body => body.json());
}

export const registerUser = (email, password) => {
  // build request
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const body = JSON.stringify({
    email,
    password,
    grant_type: 'password',
  });
  const init = {
    method: HttpRequests.POST,
    headers,
    body,
  };
  const request = new Request(AuthPath.REGISTER, init);

  // fetch
  return fetch(request)
  .then(response => {
    if(response.ok) {
      return response;
    }
    if (response.status === 401) {
      throw new Error('Error:'+response.status);
    }
    return response;
  })
  .then(body => body.json())
}