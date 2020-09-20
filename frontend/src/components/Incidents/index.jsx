import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';

import { Link } from 'react-router-dom';
import { getIncidents } from 'api/incident';
import IncidentsActions from 'redux/actions/incidents';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export function Incidents ({ incidents, setIncidents }) {
  const [error, setError] = useState(null);
  useEffect(() => {
    getIncidents().then(setIncidents).catch(setError);
  }, [setIncidents]);
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Title', accessor: 'title' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'View', Cell: ({row}) => (<Link to={`/incident/${row.id}`}>View</Link>) },
  ];
  return (
    <>
      <h1>Incidents</h1>
      <ReactTable
        data={incidents}
        columns={columns}
      />
    </>
  );
}

Incidents.propTypes = {
  incidents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
}

const mapStateToProps = state => ({
  incidents: state.incidents,
});

const mapDispatchToProps = dispatch => ({
  setIncidents: incidents => dispatch(
    IncidentsActions.setIncidents(incidents),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Incidents);
