import { Router } from 'next/router';
import { useEffect, useState } from 'react';

export function useRouteChange() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    };

    const handleRouteChangeError = () => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    };

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeError);
  }, []);

  return loading;
}
