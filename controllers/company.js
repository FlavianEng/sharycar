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
