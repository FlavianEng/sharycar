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
  // const hasUserData = Boolean(data?.user.user);
  // const userData = data?.user.user;

  useEffect(() => {
    if (!finished) {
      return;
    }
  }, [finished, hasUser]);

  //   // If human already registered and logged
  //   if (hasUser && hasUserData) {
  //     dispatch({
  //       type: userActions.IsLoggedHasData,
  //       user: data?.user,
  //     });
  //   }

  //   // If human not registered and logged
  //   if (hasUser && !hasUserData) {
  //     dispatch({
  //       type: userActions.IsLoggedHasNoData,
  //       user: data?.user,
  //     });
  //   }
  // }, [finished, hasUser]);

  // console.log('🚀   data?.user', data?.user);
  return error ? null : data?.user;
}
