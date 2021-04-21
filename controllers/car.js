import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';

export async function getActiveCar(
  driverId,
  absoluteURL = false,
  req = ''
) {
  try {
    const options = { method: 'GET' };

    let res;
    if (absoluteURL) {
      const { origin } = absoluteUrl(req);
      res = await fetch(
        `${origin}/api/car?driver=${driverId}`,
        options
      );
    } else {
      res = await fetch(`api/car?driver=${driverId}`, options);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(
        'Error with database while fetching active car'
      );
    }

    return data;
  } catch (error) {
    Router.push('error');
    throw new Error(
      'Error with database while fetching active car',
      error.message
    );
  }
}

export async function getCarById(
  carId,
  absoluteURL = false,
  req = ''
) {
  try {
    const options = { method: 'GET' };

    let res;
    if (absoluteURL) {
      const { origin } = absoluteUrl(req);
      res = await fetch(`${origin}/api/car?id=${carId}`, options);
    } else {
      res = await fetch(`api/car?id=${carId}`, options);
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error('Error with database while fetching car');
    }

    return data;
  } catch (error) {
    Router.push('error');
    throw new Error(
      'Error with database while fetching car',
      error.message
    );
  }
}
