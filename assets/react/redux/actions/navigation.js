/**
 * Open/close the navigation
 * @param  {boolean} status The navigation status.
 * @return {Object}         Action data
 */
export function toggleNavigationState(status) {
  return {
    status,
    type: 'TOGGLE_NAVIGATION',
  };
}
