import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// Creating a higher-order component (HOC)
/*
  A higher-order component (HOC) is an advanced technique in React 
  for reusing component logic. 
  HOCs are not part of the React API, per se. 
  They are a pattern that emerges from React’s compositional nature.

  https://reactjs.org/docs/higher-order-components.html
*/
/* const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer/>
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  )
}; */

const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer/>
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};


export default WithSpinner;