import React, { useEffect, useState } from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidents } from 'api/incident';
import { setIncidents } from 'redux/actions/incidents';
import PropTypes from 'prop-types';

export function Incident({ incidentId }) {
  const dispatch = useDispatch();
  const incidents = useSelector(state => state.incidents);
  const [error, setError] = useState(null);
  useEffect(() => {
    getIncidents().then(incidents => dispatch(setIncidents(incidents))).catch(e => setError(e.message));
  }, []);

  if (!incidents) return <LoadingIndicator />;

  const incident = incidents[ incidentId ];

  return (
    <>
      { error ? (
        <>
          <div className="error-message">
            <p>{error}</p>
          </div>
        </>
      ) : (
        <>
          <h1>Incident</h1>
          <p>{incident.title}</p>
          <p>{incident.description}</p>
        </>
      ) }
    </>
  );
}

Incident.propTypes = {
  incidentId: PropTypes.string,
};

export default Incident;
