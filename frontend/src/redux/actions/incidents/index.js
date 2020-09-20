
export const ActionTypes = {
  SET_INCIDENTS: 'SET_INCIDENTS',
  SET_INCIDENT: 'SET_INCIDENT',
};

export function setIncidents(incidents) {
  return {
    type: ActionTypes.SET_INCIDENTS,
    incidents,
  };
}

export function setIncident(incident) {
  return {
    type: ActionTypes.SET_INCIDENT,
    incident,
  };
}

export default {
  ActionTypes,
  setIncidents,
  setIncident,
};
