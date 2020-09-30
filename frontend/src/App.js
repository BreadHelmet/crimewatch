import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { Dashboard } from 'components/Dashboard';
import { EnsureLogin } from 'components/EnsureLogin';
import TopBar from 'components/navigation/topbar';

import Register from 'components/Register';

import { ActorsProvider } from 'actors/provider';
import { Actors } from 'actors/search';
import { Actor } from 'actors/view';

import { EventsProvider } from 'events/provider';
import { Events } from 'events/search';
import { Event } from 'events/view';

import { addBoundingBox } from 'EventsMap/index';
import { sweden } from 'geo/sweden';

import { PropsProvider } from 'props/provider';
import { Props } from 'props/search';
import { Prop } from 'props/view';

import { ScenesProvider } from 'scenes/provider';
import { Scenes } from 'scenes/search';
import { Scene } from 'scenes/view';

import { EventsMap } from 'EventsMap/index';

import { Links } from 'util/links';

import 'index.css';

function App() {
  return (
    <div className="App">

        <Router>
          <TopBar>
          <Container>
            <Route path={Links.REGISTER} component={Register} />

            <EnsureLogin>
              <Route exact path="/" component={Dashboard} />
              <Route path={Links.DASHBOARD} component={Dashboard} />

              <Route
                exact
                path={Links.EVENTS}
                render={() => (
                  <EventsProvider>
                    <Events />
                  </EventsProvider>
                )}
              />
              <Route
                path={`${Links.EVENTS}/:id`}
                render={({ match }) => (
                  <EventsProvider id={match.params.id}>
                    <Event />
                  </EventsProvider>
                )}
              />

              <Route
                exact
                path={Links.SCENES}
                render={() => (
                  <ScenesProvider>
                    <Scenes />
                  </ScenesProvider>
                )}
              />
              <Route
                path={`${Links.SCENES}/:id`}
                render={({ match }) => (
                  <ScenesProvider id={match.params.id}>
                    <Scene />
                  </ScenesProvider>
                )}
              />

              <Route
                exact
                path={Links.ACTORS}
                render={() => (
                  <ActorsProvider>
                    <Actors />
                  </ActorsProvider>
                )}
              />
              <Route
                path={`${Links.ACTORS}/:id`}
                render={({ match }) => (
                  <ActorsProvider id={match.params.id}>
                    <Actor />
                  </ActorsProvider>
                )}
              />

              <Route
                exact
                path={Links.PROPS}
                render={() => (
                  <PropsProvider>
                    <Props />
                  </PropsProvider>
                )}
              />
              <Route
                path={`${Links.PROPS}/:id`}
                render={({ match }) => (
                  <PropsProvider id={match.params.id}>
                    <Prop />
                  </PropsProvider>
                )}
              />

              <Route
                path={Links.MAP}
                render={() => <EventsMap geo={addBoundingBox(sweden)} />}
              />

            </EnsureLogin>
            </Container>
          </TopBar>
        </Router>

    </div>
  );
}

export default App;
