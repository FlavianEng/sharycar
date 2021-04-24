import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import absoluteUrl from 'next-absolute-url';
import { useRouter } from 'next/router';

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

export function useUser({ redirect, redirectToDashboard } = false) {
  const { data, error } = useSWR('/api/session', fetcher);

  if (error) {
    console.error('🚨 useUser Error:', { error });
  }

  const user = data?.user.session;
  const finished = Boolean(data);
  const hasUser = Boolean(user);
  const hasUserData = Boolean(data?.user.user);
  const { asPath } = useRouter();

  useEffect(() => {
    if (!redirect || !finished) {
      return;
    }

    const { origin } = absoluteUrl();
    // If human is not logged
    if (!hasUser) {
      Router.push(`${origin}/signIn`);
    }

    // If human is logged but not registered
    if (hasUser && !hasUserData) {
      Router.push(`${origin}/firstVisit`);
    }

    // If human already registered and logged
    if (hasUser && hasUserData) {
      const role = data?.user.user.role;

      !asPath.includes(role) &&
        Router.push(`${origin}/${role}/dashboard`);
    }

    // If human already registered and logged
    if (hasUser && hasUserData && redirectToDashboard) {
      const role = data?.user.user.role;
      Router.push(`${origin}/${role}/dashboard`);
    }
  }, [redirect, finished, hasUser, hasUserData]);

  return error ? null : data?.user;
}
