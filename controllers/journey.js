import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';

export async function getJourneys(
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
        `${origin}/api/journey?driver=${driverId}&withInformations=true`,
        options
      );
    } else {
      res = await fetch(
        `api/journey?driver=${driverId}&withInformations=true`,
        options
      );
    }

    const data = await res.json();

    if (!data.success) {
      // Router.push('error');
      throw new Error('Error with database while fetching journeys');
    }

    return data;
  } catch (error) {
    // Router.push('error');
    throw new Error(
      'Error with database while fetching journeys',
      error.message
    );
  }
}

// TODO: Uncomment error redirection
export async function createJourney(journeyData) {
  try {
    const journeyResult = await fetch('api/journey', {
      method: 'POST',
      body: JSON.stringify(journeyData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((response) => {
      return response.json();
    });

    if (!journeyResult.success) {
      // Router.push('error');
      throw new Error('Error with database during journey creation');
    }

    return journeyResult;
  } catch (error) {
    // Router.push('error');
    throw new Error('Unable to create a journey: ', error);
  }
}
