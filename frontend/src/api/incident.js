import { HttpRequests } from './variables';

export const getIncident = id => {
  return fetch(`http://localhost:8000/incidents/${id}`, {
    method: HttpRequests.GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    },
  }).then(response => {
    if (response.ok) return response.json();
    // TODO: 401 redirect to login
    if (response.status >= 400) {
      throw new Error('Error:'+response.status);
    }
    return response;
  });
}

export function getIncidents() {
  return fetch('http://localhost:8000/incidents', {
    method: HttpRequests.GET,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    },
  }).then(response => {
    if (response.ok) return response.json();
    // TODO: 401 redirect to login
    if (response.status >= 400) {
      throw new Error('Error:'+response.status);
    }
    return response;
  });
}
