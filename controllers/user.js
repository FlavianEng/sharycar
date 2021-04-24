import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';
import { getUserSession, logoutUser } from './session';
import {
  deleteJourneyById,
  removeJourneyPassengerById,
} from './journey';
import { deleteAddress } from './address';

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

export async function getUserFromId(userId) {
  const { origin } = absoluteUrl();

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

export async function updateUser(data) {
  const { origin } = absoluteUrl();

  const user = await fetch(`${origin}/api/user`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });

  const res = await user.json();

  return res;
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

  await deleteAddress(patchData.address);

  return res;
}

export async function deleteUserById(userId) {
  const { origin } = absoluteUrl();

  await fetch(`${origin}/api/user?id=${userId}`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });
}

export async function deleteUser(user) {
  const userId = user.user._id;
  const journeys = user.journey;

  journeys.forEach(async (element) => {
    const driverId = element.driverId._id;

    if (userId === driverId) {
      await deleteJourneyById(element._id);
    } else {
      await removeJourneyPassengerById(element._id, userId);
    }
  });

  const addresses = user.user.addressId;

  addresses.forEach(async (element) => {
    const data = {
      id: userId,
      address: element._id,
    };

    await removeUserAddress(data);
  });

  await deleteUserById(userId);

  await logoutUser();

  // EVO: Delete my cars
}
