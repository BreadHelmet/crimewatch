import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getIncident } from 'api/incident';
import IncidentActions from 'redux/actions/incidents/index';
import PropTypes from 'prop-types';

export function Incident({ id, setIncident, incident }) {
  const [error, setError] = useState(null);
  useEffect(() => {
    getIncident(id).then(setIncident).catch(setError);
  }, [id, setIncident]);
  return (
    <>
      <div className="incident-card">
        <h1>Incident</h1>
        <p>{incident?.title}</p>
        <p>{incident?.description}</p>
      </div>
    </>
  );
}

Incident.propTypes = {
  id: PropTypes.string.isRequired,
  setIncident: PropTypes.func.isRequired,
  incident: PropTypes.object,
};

Incident.defaultProps = {
  incident: null,
};

const mapStateToProps = state => ({
  incident: state.incident,
});

const mapDispatchToProps = dispatch => ({
  setIncident: incident => dispatch(
    IncidentActions.setIncident(incident),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Incident);
