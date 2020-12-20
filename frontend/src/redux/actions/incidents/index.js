
export const ActionTypes = {
  SET_INCIDENTS: 'SET_INCIDENTS',
  SET_INCIDENT: 'SET_INCIDENT',
  SET_FIELD: 'SET_FIELD',
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

export function setField(key, val) {
  return {
    type: ActionTypes.SET_FIELD,
    key,
    val,
  };

}

export default {
  ActionTypes,
  setIncidents,
  setIncident,
  setField,
};
