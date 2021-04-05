export async function createAddress(addressData) {
  const addressResult = await fetch('api/address', {
    method: 'POST',
    body: JSON.stringify(addressData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((response) => {
    return response.json();
  });

  if (!addressResult.success) {
    // TODO: Redirect to error page
    throw new Error('Error with database during address creation');
  }

  return addressResult;
}
