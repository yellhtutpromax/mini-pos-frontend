// src/app/auth/error/page.js

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error'); // Get the error message from the URL parameters

  useEffect(() => {
    if (error) {
      console.error("Error during authentication:", error);
    }
  }, [error]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Authentication Error</h1>
      <p>{error ? `Error: ${error}` : 'An unknown error occurred.'}</p>
      <p>Please try again or contact support.</p>
    </div>
  );
};

export default ErrorPage;
