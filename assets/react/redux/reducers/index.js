import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import intl from './intl';
import navigation from './navigation';

const rootReducer = combineReducers({
  intl,
  navigation,
  routing: routerReducer,
});

export default rootReducer;
