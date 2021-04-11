import Router from 'next/router';

export async function getCompanyFromCompanyCode(companyCode) {
  const companyResult = await fetch(
    `api/company?companyCode=${companyCode}`,
    {
      method: 'GET',
    }
  ).then((response) => {
    return response.json();
  });

  return companyResult;
}

export async function createCompany(companyData) {
  try {
    const companyResult = await fetch('api/company', {
      method: 'POST',
      body: JSON.stringify(companyData),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then((response) => {
      return response.json();
    });

    if (!companyResult.success) {
      Router.push('error');
      throw new Error('Error with database during company creation');
    }

    return companyResult;
  } catch (error) {
    Router.push('error');
    throw new Error('Unable to create company: ', error);
  }
}
