import React, { useState } from 'react';
import Layout from '../../components/dashboard/layout';
import { useUser } from '../../lib/hooks';

export default function UserJourney() {
  const user = useUser();

  useUser({ redirect: true });

  // Global states
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Boom !');

  return (
    <Layout
      errorVisibility={errorBanner}
      errorMessage={errorMsg}
      closeBannerFunc={() => setErrorBanner(false)}
    >
      <h2>JOURNEY</h2>
    </Layout>
  );
}
