export function saveRole(values) {
  return {
    ...values,
    role: document.querySelector('#switchRole').checked
      ? 'company'
      : 'user',
  };
}

export function saveCompanyCode(values) {
  return {
    ...values,
    companyCode: document.querySelector('#companyCode').value,
  };
}

export function saveUserIdentity(values) {
  return {
    ...values,
    firstName: document.querySelector('#firstName').value,
    lastName: document.querySelector('#lastName').value,
    gender: document.querySelector('#gender').value,
    birthday: document.querySelector('#birthday').value,
  };
}

export function saveUserAddress(values) {
  return {
    ...values,
    street: document.querySelector('#street').value,
    city: document.querySelector('#city').value,
    postalCode: document.querySelector('#postCode').value,
    country: document.querySelector('#country').value,
  };
}

export function saveUserContact(values, email) {
  return {
    ...values,
    email: email,
    phoneNumber: document.querySelector('#phoneNumber').value,
  };
}
