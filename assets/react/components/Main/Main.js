import React from 'react';
import PropTypes from 'prop-types';

import NavigationContainer from '../Navigation/NavigationContainer';
import FooterContainer from '../Footer/FooterContainer';

const Main = (props) => (
  <div>
    <div className="header">
      <NavigationContainer {...props} />
    </div>
    <div className="main">
      {React.cloneElement(props.children, props)}
    </div>
    <div className="footer">
      <FooterContainer />
    </div>
  </div>
);

Main.propTypes = {
  children: PropTypes.any,
};

export default Main;
