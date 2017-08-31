import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import Navigation from './Navigation';

export default class NavigationContainer extends React.Component {

  /**
   * Open / Close the navigation.
   * @param  {Object} event The JS event as an Object.
   * @return {Function}     Update the navigation state using Redux.
   */
  toggleNavigation(event) {
    event.preventDefault();
    const {
      navigation,
      toggleNavigationState,
    } = this.props;

    toggleNavigationState(!navigation.status);
  }

  /**
   * Close the navigation.
   * @param  {Object}   event The JS event as an Object.
   * @param  {String}   route The next item navigation the user has clicked.
   * @return {Function}       Close the navigation and take the user
   *                          to the chosen view.
   */
  closeNavigation(event, route) {
    event.preventDefault();
    this.props.toggleNavigationState(false);
    browserHistory.push(route);
  }

  render() {
    return (
      <Navigation
        onToggleNavigation={event => this.toggleNavigation(event)}
        isOpen={this.props.navigation.status}
        onClickItem={(event, route) => this.closeNavigation(event, route)}
      />
    );
  }
}

NavigationContainer.propTypes = {
  toggleNavigationState: PropTypes.func.isRequired,
  navigation: PropTypes.object,
};
