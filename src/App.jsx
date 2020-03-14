import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history, renderControl } from '@helpers';
import { LoginPage, AuthRoute, InitialStorage } from '@pages';

function App() {
  renderControl('App');
  return (
    <Router history={history}>
      <InitialStorage>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <AuthRoute>
            <h1>Hello</h1>
          </AuthRoute>
        </Switch>
      </InitialStorage>
    </Router>
  );
}

export default App;
