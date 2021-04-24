import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';

export async function getUserSession() {
  const { origin } = absoluteUrl();

  const user = await fetch(`${origin}/api/session`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
  });

  const res = await user.json();

  return res;
}

export async function logoutUser() {
  const { origin } = absoluteUrl();

  await fetch(`${origin}/api/logout`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
  });

  Router.push('/');
}
