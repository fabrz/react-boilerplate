import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './Footer.scss';

const Footer = (props) => {
  const { year } = props;

  return (
    <footer styleName={classNames('footer')}>
      <div>
        <p>{year}</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  year: PropTypes.number.isRequired,
};

export default cssModules(Footer, styles, { allowMultiple: true });
