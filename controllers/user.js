import Router from 'next/router';

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
    throw new Error('Error with database during address creation');
  }

  return user;
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

export async function getUserFromEmail(userEmail) {
  const user = await fetch(`api/user?email=${userEmail}`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json; charset=utf-8' },
  }).then((response) => {
    return response.json();
  });

  return user;
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
