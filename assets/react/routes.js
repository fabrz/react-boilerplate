import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/App';
import LandingPageContainer from './components/LandingPage/LandingPageContainer';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPageContainer} />
  </Route>
);

export default routes;
