import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from 'components/Register';
import Incident from 'components/Incidents/Incident';
import Incidents from 'components/Incidents/Incidents';
import Dashboard from 'components/Dashboard';
import EnsureLogin from 'components/EnsureLogin';
import TopBar from 'components/navigation/topbar';
import IncidentMap from 'components/IncidentMap';

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar>
          <Route path="/register" component={Register} />
          {/* <Route path="/login" component={Login} /> */}

          <EnsureLogin>
            
              <Route exact path="/" component={Dashboard} />
              <Route path="/incidents" component={Incidents} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/map" component={IncidentMap} />
              <Route
                path="/incident/:incidentId?"
                render={({match}) => (<Incident incidentId={match.params.incidentId} />)}
              />
            
          </EnsureLogin>
        </TopBar>
      </Router>
    </div>
  );
}

export default App;
