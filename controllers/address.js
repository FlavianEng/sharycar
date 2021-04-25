import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';

export async function createAddress(addressData) {
  const { origin } = absoluteUrl();

  const addressResult = await fetch(`${origin}/api/address`, {
    method: 'POST',
    body: JSON.stringify(addressData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((response) => {
    return response.json();
  });

  if (!addressResult.success) {
    Router.push('error');
    throw new Error('Error with database during address creation');
  }

  return addressResult;
}

export async function deleteAddress(addressId) {
  const { origin } = absoluteUrl();

  const addressResult = await fetch(
    `${origin}/api/address?addressId=${addressId}`,
    {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
  ).then((response) => {
    return response.json();
  });

  if (!addressResult.success) {
    throw new Error('Error with database when deleting an address');
  }

  return addressResult;
}
