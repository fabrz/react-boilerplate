import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';

import { getImage } from '../../helpers/general';
import styles from './LandingPage.scss';

const LandingPage = () => (
  <div styleName={classNames('landing')}></div>
);

export default cssModules(LandingPage, styles, { allowMultiple: true });
