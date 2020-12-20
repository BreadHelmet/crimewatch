import { HttpRequest } from 'api/HttpRequest';
import { ContentType } from './contenttype';

export class Incidents {
  static endpoint = {
    root: '/incidents',
    for: id => `/incidents/${id}`,
  };

  static create(incident) {
    return HttpRequest.post(
      Incidents.endpoint.root,
      incident,
      ContentType.JSON);
  }

  static read(id) {
    if (id) {
      return HttpRequest.get(
        Incidents.endpoint.for(id));
    }
    return HttpRequest.get(
      Incidents.endpoint.root);
  }

  static update(incident) {
    return HttpRequest.put(
      Incidents.endpoint.root,
      incident,
      ContentType.JSON);
  }

  static delete(id) {
    return HttpRequest.delete(
      Incidents.endpoint.for(id));
  }
}

// export const getIncident = id => {
//   return fetch(`http://localhost:8000/incidents/${id}`, {
//     method: HttpRequests.GET,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('access_token')}`
//     },
//   }).then(response => {
//     if (response.ok) return response.json();
//     // TODO: 401 redirect to login
//     if (response.status >= 400) {
//       throw new Error('Error:'+response.status);
//     }
//     return response;
//   });
// }

// export function getIncidents() {
//   return fetch('http://localhost:8000/incidents', {
//     method: HttpRequests.GET,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${localStorage.getItem('access_token')}`
//     },
//   }).then(response => {
//     if (response.ok) return response.json();
//     // TODO: 401 redirect to login
//     if (response.status >= 400) {
//       throw new Error('Error:'+response.status);
//     }
//     return response;
//   });
// }

// export function updateIncident(incident) {

// }
