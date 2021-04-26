import 'tailwindcss/tailwind.css';
import React, { useEffect } from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import { getUserSession } from '../controllers/session';
import Router, { useRouter } from 'next/router';
import absoluteUrl from 'next-absolute-url';

// eslint-disable-next-line no-unused-vars
function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();

  useEffect(async () => {
    const session = await getUserSession();
    const { origin } = absoluteUrl();

    if (!session.user.session) {
      if (asPath !== '/signIn' && asPath !== '/') {
        Router.push(`${origin}/signIn`);
      }
    }

    if (session.user.session && !session.user.user) {
      if (asPath !== '/firstVisit' && asPath !== '/') {
        Router.push(`${origin}/firstVisit`);
      }
    }

    if (session.user.session && session?.user?.user) {
      const role = session.user.user.role;

      if (asPath === '/signIn' || asPath === '/firstVisit') {
        Router.push(`${origin}/${role}/dashboard`);
      }

      if (role === 'user') {
        if (
          asPath !== '/user/dashboard' ||
          asPath !== '/user/journey' ||
          asPath !== '/user/address' ||
          asPath !== '/user/profile'
        )
          Router.push(`${origin}/${role}/dashboard`);
      }
      if (role === 'company') {
        if (
          asPath !== '/company/dashboard' ||
          asPath !== '/company/account'
        )
          Router.push(`${origin}/${role}/dashboard`);
      }
    }
  }, []);

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
