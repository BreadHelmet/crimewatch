import { HttpRequest } from 'api/HttpRequest';
import { ContentType } from './contenttype.js';

export class UsersApi {
  static endpoint = {
    root: '/users',
    for: id => `/users/${id}`,
    login: '/users/login',
    register: '/users/register',
    refresh: '/users/refresh',
    auth: '/users/auth',
  };

  static login(email, password) {
    return HttpRequest.post(
      UsersApi.endpoint.login, {
        email,
        password,
        grant_type: 'password',
      },
      ContentType.JSON,
    ).then(data => {
        if (data.access_token) {
          localStorage.setItem(
            'access_token',
            data.access_token);
        }
        return data;
    });
  }

  static register(email, password) {
    return HttpRequest.post(
      UsersApi.endpoint.register, {
        email,
        password,
        grant_type: 'password',
      },
      ContentType.ENCODED);
  }

  static auth() {
    return HttpRequest.get(
      UsersApi.endpoint.auth);
  }

  static create(user) {
    return HttpRequest.post(
      UsersApi.endpoint.root,
      user,
      ContentType.JSON);
  }

  static read(id) {
    if (id instanceof Number) {
      return HttpRequest.get(
        UsersApi.endpoint.for(id));
    }
    return HttpRequest.get(
      UsersApi.endpoint.root);
  }

  static update(user) {
    return HttpRequest.put(
      UsersApi.endpoint.for(user.id),
      user,
      ContentType.JSON);
  }

  static delete(id) {
    return HttpRequest.delete(
      UsersApi.endpoint.for(id));
  }
}

// export const logIn = (email, password) => {
//   const headers = new Headers({
//     'Content-Type': 'application/json',
//   });
//   const body = JSON.stringify({
//     email,
//     password,
//     grant_type: 'password',
//   });
//   const init = {
//     method: HttpRequests.POST,
//     headers,
//     body,
//   };
//   const request = new Request(AuthPath.LOGIN, init);

//   return fetch(request)
//   .then(response => {
//     if (response.ok) {
//       return response;
//     }
//     if (response.status >= 400) {
//       throw new Error('Error:'+response.status);
//     }
//     return response;
//   })
//   .then(body => body.json());
// }

// export const registerUser = (email, password) => {
//   // build request
//   const headers = new Headers({
//     'Content-Type': 'application/json',
//   });
//   const body = JSON.stringify({
//     email,
//     password,
//     grant_type: 'password',
//   });
//   const init = {
//     method: HttpRequests.POST,
//     headers,
//     body,
//   };
//   const request = new Request(AuthPath.REGISTER, init);

//   // fetch
//   return fetch(request)
//   .then(response => {
//     if(response.ok) {
//       return response;
//     }
//     if (response.status === 401) {
//       throw new Error('Error:'+response.status);
//     }
//     return response;
//   })
//   .then(body => body.json())
// }
