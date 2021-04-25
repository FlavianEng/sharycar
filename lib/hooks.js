import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

export function useUser() {
  const dispatch = useDispatch();
  const { data, error } = useSWR('/api/session', fetcher);

  if (error) {
    console.error('🚨 useUser Error:', { error });
  }

  const user = data?.user.session;
  const finished = Boolean(data);
  const hasUser = Boolean(user);
  const hasUserData = Boolean(data?.user.user);
  const userData = data?.user.user;

  useEffect(() => {
    if (!finished) {
      return;
    }

    // If human already registered and logged
    if (hasUser && hasUserData) {
      dispatch({
        type: userActions.IsLoggedHasData,
        user: data?.user,
      });
    }

    // If human not registered and logged
    if (hasUser && !hasUserData) {
      dispatch({
        type: userActions.IsLoggedHasNoData,
        user: data?.user,
      });
    }
  }, [finished, hasUser]);

  return error ? null : data?.user;
}
