import Router from 'next/router';
import absoluteUrl from 'next-absolute-url';

export async function getCompanyFromCompanyCode(companyCode) {
  const res = await fetch(`api/company?companyCode=${companyCode}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}

export async function getCompanyCodes(absoluteURL = false, req = '') {
  let res;
  if (absoluteURL) {
    const { origin } = absoluteUrl(req);
    res = await fetch(`${origin}/api/company?companyCode=all`, {
      method: 'GET',
    });
  } else {
    res = await fetch('api/company?companyCode=all', {
      method: 'GET',
    });
  }

  const data = await res.json();

  return data;
}

export async function getCompanyWithAddress(companyCode) {
  const res = await fetch(
    `api/company?withAddress=true&companyCode=${companyCode}`,
    {
      method: 'GET',
    }
  );

  const data = await res.json();

  return data;
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
