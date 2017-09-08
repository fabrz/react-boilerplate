import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import styles from './Navigation.scss';

const Navigation = (props) => {
  const {
    onToggleNavigation,
    isOpen,
    onClickItem,
  } = props;

  const classes = classNames('navigation', 'items', {
    active: isOpen,
  });

  return (
    <header styleName={classes}>
      <div className="container">
        <div styleName="navigation__items">
          <div styleName="logo">
            <button styleName="logo__button" onClick={event => onClickItem(event, '/')}>
              Logo
            </button>
            <button onClick={onToggleNavigation}>
              Menu
            </button>
          </div>
          <ul styleName={classes}>
            <li>
              <button onClick={onToggleNavigation}>
                Close
              </button>
            </li>
            <li>
              <button onClick={event => onClickItem(event, '/')}>
                Homepage
              </button>
            </li>
            <li>
              <button onClick={event => onClickItem(event, '/page')}>
                <FormattedMessage {...messages.page} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Navigation.propTypes = {
  onToggleNavigation: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClickItem: PropTypes.func,
};

export default cssModules(Navigation, styles, { allowMultiple: true });
