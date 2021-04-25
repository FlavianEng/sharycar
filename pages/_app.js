import 'tailwindcss/tailwind.css';
import React from 'react';
import '../styles/globals.css';
import Head from 'next/head';

// eslint-disable-next-line no-unused-vars
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>{' '}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
