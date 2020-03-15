import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from '@helpers';
import { LoginPage, AuthRoute, InitialStorage, PrimaryLayouts } from '@pages';
import { Layouts } from '@layouts';

const App = () => {
  return (
    <Router history={history}>
      <InitialStorage>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <AuthRoute>
            <Layouts>
              <PrimaryLayouts />
            </Layouts>
          </AuthRoute>
        </Switch>
      </InitialStorage>
    </Router>
  );
};

export { App };
