import React from 'react';
import {
  BrowserRouter as Router,
  Redirect, Route, Switch
} from "react-router-dom";

import AppLayout from './layouts/app';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="">
          <AppLayout />
        </Route>
        <Redirect from="*" to="" />
      </Switch>
    </Router>
  );
}

export default Routes;
