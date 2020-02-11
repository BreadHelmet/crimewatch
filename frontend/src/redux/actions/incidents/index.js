
export const ActionTypes = {
  SET_INCIDENTS: 'SET_INCIDENTS',
};

export function setIncidents(incidents) {
  return {
    type: ActionTypes.SET_INCIDENTS,
    incidents,
  };
}

export default {
  ActionTypes,
  setIncidents,
};
