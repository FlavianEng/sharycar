import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

export function useUser() {
  console.log('UseUSer is called');
  const { data, error } = useSWR('/api/session', fetcher);

  if (error) {
    console.error('🚨 useUser Error:', { error });
  }

  const user = data?.user.session;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!finished) {
      return;
    }
  }, [finished, hasUser]);

  return error ? null : data?.user;
}
