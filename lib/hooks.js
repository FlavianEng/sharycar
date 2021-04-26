import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

let stableUser = {};

export function useUser() {
  const { data, error } = useSWR('/api/session', fetcher);

  if (error) {
    if (stableUser) {
      console.log('🔐 USING STABLE USER', stableUser);
      return stableUser;
    } else {
      console.error('🚨 useUser Error:', { error });
    }
  }

  const user = data?.user.session;
  const finished = Boolean(data);
  const hasUser = Boolean(user);
  const hasUserData = Boolean(data?.user.user);

  useEffect(() => {
    if (!finished) {
      return;
    }

    if (hasUser && hasUserData) {
      stableUser = data?.user;
    }
  }, [finished, data]);

  return error ? null : data?.user;
}
