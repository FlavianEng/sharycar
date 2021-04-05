export async function createUser(userData) {
  const user = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then((response) => {
    return response.json();
  });

  if (!user.success) {
    // TODO: Redirect to error page
    throw new Error('Error with database during address creation');
  }

  return user;
}
