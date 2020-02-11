import React from 'react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="dashboard">
      <h1>dashboard</h1>
      <Link to="/incidents">incidents</Link>
    </div>
  );
}

export default Dashboard;
