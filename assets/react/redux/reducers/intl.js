import update from 'immutability-helper';

export default function setLocaleReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_LOCALE':
      return update(state, {
        locale: { $set: action.locale },
      });
    default:
      return state;
  }
}
