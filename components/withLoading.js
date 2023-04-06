import React, { useState, useEffect } from 'react';
import Loading from './loading';

const withLoading = (WrappedComponent) => {
  const WithLoadingComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate a delay to show the loading screen
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    return isLoading ? <Loading /> : <WrappedComponent />;
  };

  return WithLoadingComponent;
};

export default withLoading;
