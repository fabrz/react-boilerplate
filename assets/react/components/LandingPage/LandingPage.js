import React from 'react';
import cssModules from 'react-css-modules';
import classNames from 'classnames';
import SVGInline from 'react-svg-inline';

import { getImage } from '../../helpers/general';
import styles from './LandingPage.scss';

const LandingPage = () => (
  <div styleName={classNames('landing')}>
    <div>
      <ul>
        <li>
          <SVGInline svg={getImage('./svg/react.svg')} />
        </li>
        <li>
          <SVGInline svg={getImage('./svg/redux.svg')} />
        </li>
        <li>
          <SVGInline svg={getImage('./svg/es6.svg')} />
        </li>
        <li>
          <SVGInline svg={getImage('./svg/babel.svg')} />
        </li>
      </ul>
    </div>
  </div>
);

export default cssModules(LandingPage, styles, { allowMultiple: true });
