import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidents } from 'api/incident';
import { setIncidents } from 'redux/actions/incidents';
import LoadingIndicator from 'components/LoadingIndicator';

const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Title', accessor: 'title' },
  { Header: 'Description', accessor: 'description' },
  { Header: 'View', Cell: ({row}) => (<Link to={`/incident/${row.id}`}>View</Link>) },
];

export function Incidents () {
  const dispatch = useDispatch();
  const incidents = useSelector(state => state.incidents);
  const [error, setError] = useState(null);
  useEffect(() => {
    getIncidents().then(incidents => dispatch(setIncidents(incidents))).catch(e => setError(e.message));
  }, []);

  if (!incidents) return <LoadingIndicator />;
  
  return (
    <>
      <h1>Incidents</h1>
      <div className="error-message">{error}</div>
      <ReactTable
        data={Object.values(incidents)}
        columns={columns}
      />
    </>
  );
}

export default Incidents;
