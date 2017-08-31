import update from 'immutability-helper';

export default function toggleNavigationReducer(state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_NAVIGATION':
      return update(state, {
        status: { $set: action.status },
      });
    default:
      return state;
  }
}
