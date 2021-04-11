import Router from 'next/router';

export async function createAddress(addressData) {
  const addressResult = await fetch('api/address', {
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
  const addressResult = await fetch(
    `api/address?addressId=${addressId}`,
    {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
  ).then((response) => {
    return response.json();
  });

  if (!addressResult.success) {
    Router.push('error');
    throw new Error('Error with database when deleting an address');
  }

  return addressResult;
}
