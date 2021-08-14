import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, clearcart, ...otherProps }) => (
  <button 
    className=
    {
      `
      ${clearcart ? 'clear-cart' : ''}
      ${inverted ? 'inverted' : ''} 
      ${isGoogleSignIn ? 'google-sign-in': ''} 
      custom-button
      `
    }
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;