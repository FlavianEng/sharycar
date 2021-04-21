import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';

export async function getJourneysByTimeOfDeparture(
  timeOfDeparture,
  driverId
) {
  try {
    const { origin } = absoluteUrl();
    const res = await fetch(
      `${origin}/api/journey?timeOfDeparture=${timeOfDeparture}&userId=${driverId}`,
      { method: 'GET' }
    );
    const data = await res.json();

    if (!data.success) {
      Router.push('error');
      throw new Error('Error with database while fetching journeys');
    }

    return data;
  } catch (error) {
    Router.push('error');
    throw new Error(
      'Error with database while fetching journeys',
      error.message
    );
  }
}

// Finds all not began journeys of human (driver or passenger)
// With informations
export async function getJourneys(
  userId,
  withInfos = false,
  absoluteURL = false,
  req = ''
) {
  try {
    const options = { method: 'GET' };
    let res;
    if (absoluteURL) {
      const { origin } = absoluteUrl(req);
      res = await fetch(
        `${origin}/api/journey?user=${userId}&withInformations=${withInfos}`,
        options
      );
    } else {
      res = await fetch(
        `api/journey?user=${userId}&withInformations=${withInfos}`,
        options
      );
    }

    const data = await res.json();

    if (!data.success) {
      Router.push('error');
      throw new Error('Error with database while fetching journeys');
    }

    return data;
  } catch (error) {
    Router.push('error');
    throw new Error(
      'Error with database while fetching journeys',
      error.message
    );
  }
}

export async function createNewJourney(journeyData) {
  const { origin } = absoluteUrl();
  try {
    const journeyResult = await fetch(`${origin}/api/journey`, {
      method: 'POST',
      body: JSON.stringify(journeyData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((response) => {
      return response.json();
    });

    if (!journeyResult.success) {
      Router.push('error');
      throw new Error('Error with database during journey creation');
    }

    return journeyResult;
  } catch (error) {
    Router.push('error');
    throw new Error('Unable to create a journey: ', error.message);
  }
}

export async function updateJourneyPassengersById(
  journeyId,
  newPassengerId
) {
  const { origin } = absoluteUrl();
  try {
    const updateData = {
      id: journeyId,
      newPassenger: newPassengerId,
    };

    const update = await fetch(`${origin}/api/journey`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    const res = await update.json();

    if (!res.success || res.data.n !== 1) {
      throw new Error('Error with database while updating journey');
    }

    return res;
  } catch (error) {
    Router.push('error');
    throw new Error(
      'Error with database while updating journey',
      error.message
    );
  }
}
