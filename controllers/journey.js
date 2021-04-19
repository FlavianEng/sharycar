import Router from 'next/router';

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
