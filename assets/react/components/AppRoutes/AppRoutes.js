import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from '../../redux/store';
import { IntlProvider } from 'react-intl';

import routes from '../../routes';

export default () => (
  <Provider store={store}>
    <IntlProvider
      locale="en"
      messages={store.getState().intl.messages.en}
    >
      <Router
        history={history}
        routes={routes}
        onUpdate={() => window.scrollTo(0, 0)}
      />
    </IntlProvider>
  </Provider>
);
