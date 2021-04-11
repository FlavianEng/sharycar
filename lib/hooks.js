import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

export function useUser({
  redirectTo,
  redirectIfFound,
  redirectIfAlreadyRegistered,
} = {}) {
  const { data, error } = useSWR('/api/session', fetcher);
  const user = data?.user.session;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if ((!redirectTo && !redirectIfAlreadyRegistered) || !finished)
      return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser && !redirectIfFoundTo)
    ) {
      Router.push(redirectTo);
    }
    // If human already registered and logged
    if (redirectIfAlreadyRegistered && hasUser) {
      const role = data?.user.user.role;
      Router.push(`${role}/dashboard`);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : data?.user;
}
