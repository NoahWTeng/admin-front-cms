import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from '@helpers';
import { LoginPage } from '@pages';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        {/* <AuthRoute> */}
        {/* <Layouts><PrimaryLayouts /></Layouts> */}
        {/* </AuthRoute> */}
      </Switch>
    </Router>
  );
}
// const mapState = state => state;

export default App;
