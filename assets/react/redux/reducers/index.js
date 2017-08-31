import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import navigation from './navigation';

const rootReducer = combineReducers({
  navigation,
  routing: routerReducer,
});

export default rootReducer;
