import React from 'react';

import Footer from './Footer';

const FooterContainer = () => {
  const year = new Date().getFullYear();

  return (
    <Footer year={year} />
  );
};

export default FooterContainer;
