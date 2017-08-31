import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';

import App from './components/App/App';
import LandingPageContainer from './components/LandingPage/LandingPageContainer';

render((
  <Provider store={store}>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPageContainer} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
