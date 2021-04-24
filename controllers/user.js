import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';

export async function createUser(userData) {
  const user = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((response) => {
    return response.json();
  });

  if (!user.success) {
    Router.push('error');
    throw new Error('Error with database during user creation');
  }

  return user;
}

export async function getUserInfos() {
  const user = await fetch(`${origin}/api/session`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
  });

  const res = await user.json();

  return res;
}

export async function getUserFromId(userId) {
  const user = await fetch(`${origin}/api/user?id=${userId}`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
  }).then((response) => {
    return response.json();
  });

  return user;
}

export async function getUserFromEmail(
  userEmail,
  absoluteURL = false,
  req = ''
) {
  let res;

  if (absoluteURL) {
    const { origin } = absoluteUrl(req);
    res = await fetch(`${origin}/api/user?email=${userEmail}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
    });
  } else {
    res = await fetch(`api/user?email=${userEmail}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
    });
  }

  const data = await res.json();

  return data;
}

export async function patchUserCompanyId(patchUserData) {
  const user = await fetch('api/user', {
    method: 'PUT',
    body: JSON.stringify(patchUserData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((response) => {
    return response.json();
  });

  return user;
}

export async function updateUserAddresses(patchData) {
  const { origin } = absoluteUrl();

  const data = { ...patchData, direction: 'add' };

  const user = await fetch(`${origin}/api/user`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });

  const res = await user.json();

  return res;
}

export async function removeUserAddress(patchData) {
  const { origin } = absoluteUrl();

  const data = { ...patchData, direction: 'remove' };

  const user = await fetch(`${origin}/api/user`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });

  const res = await user.json();

  return res;
}
