import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';

export async function createUser(userData) {
  const res = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });

  const data = await res;

  if (!data.success) {
    Router.push('error');
    throw new Error('Error with database during address creation');
  }

  return data;
}

export async function getUserFromId(userId) {
  const user = await fetch(`api/user?id=${userId}`, {
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

// If necessary, rewrite this to take an object instead of companyId
// And build patchObj dynamically
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
