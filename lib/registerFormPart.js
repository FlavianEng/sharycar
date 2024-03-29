import { createAddress } from '../controllers/address';
import {
  createCompany,
  getCompanyWithAddress,
} from '../controllers/company';
import { createUser, patchUserCompanyId } from '../controllers/user';
import mongoose from 'mongoose';

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
    gender: document.querySelector('#gender').value.toLowerCase(),
    birthday: document.querySelector('#birthday').value,
  };
}

export function saveUserAddress(values) {
  return {
    ...values,
    street: document.querySelector('#street').value,
    city: document.querySelector('#city').value,
  };
}

export function saveCompanyAddress(values) {
  return {
    ...values,
    street: document.querySelector('#street').value,
    city: document.querySelector('#city').value,
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

export function saveCompanyIdentity(values) {
  return {
    ...values,
    companyName: document.querySelector('#companyName').value,
    registrationNumber: document.querySelector('#registrationNumber')
      .value,
    companyNationality: document.querySelector('#companyNationality')
      .value,
  };
}

export function saveChosenPlan(values) {
  return {
    ...values,
    plan: document.querySelector('#chosenPlan').value,
  };
}

export function saveEmailTemplate(values) {
  return {
    ...values,
    emailTemplate: document.querySelector('#emailTemplate').value,
  };
}

export async function submitUserRegistration(values) {
  const companyResult = await getCompanyWithAddress(
    values.companyCode
  );

  if (!companyResult.success || !companyResult.data) {
    return false;
  }

  const addressData = {
    name: 'Home',
    street: values.street,
    city: values.city,
    country: companyResult.data.addressId.country,
  };

  const addressResult = await createAddress(addressData);

  if (!addressResult.success || !addressResult.data) {
    return false;
  }

  const addressId = addressResult.data._id;

  const companyId = companyResult.data._id;

  const userData = {
    firstName: values.firstName,
    lastName: values.lastName,
    gender: values.gender,
    birthday: values.birthday,
    email: values.email,
    phoneNumber: values.phoneNumber,
    companyId: mongoose.Types.ObjectId(companyId),
    role: values.role,
    addressId: mongoose.Types.ObjectId(addressId),
  };

  const userResult = await createUser(userData);

  if (!userResult.success || !userResult.data) {
    return false;
  }
  return true;
}

export async function submitCompanyRegistration(values) {
  const addressData = {
    name: 'Company',
    street: values.street,
    city: values.city,
    country: values.country,
  };

  const addressResult = await createAddress(addressData);

  if (!addressResult.success || !addressResult.data) {
    return false;
  }

  const addressId = addressResult.data._id;

  const userData = {
    firstName: values.firstName,
    lastName: values.lastName,
    gender: values.gender,
    birthday: values.birthday,
    email: values.email,
    phoneNumber: values.phoneNumber,
    // companyId is not set here
    role: values.role,
    addressId: mongoose.Types.ObjectId(addressId),
  };

  const userResult = await createUser(userData);
  if (!userResult.success || !userResult.data) {
    return false;
  }

  const userId = userResult.data._id;

  const companyData = {
    creatorId: mongoose.Types.ObjectId(userId),
    addressId: mongoose.Types.ObjectId(addressId),
    companyName: values.companyName,
    companyNationality: values.companyNationality,
    registrationNumber: values.registrationNumber,
    plan: values.plan,
    // emailTemplate: values.emailTemplate,
    companyCode: values.companyCode,
  };

  const companyResult = await createCompany(companyData);
  if (!companyResult.success || !companyResult.data) {
    return false;
  }
  const companyId = companyResult.data._id;

  const patchUserData = {
    id: mongoose.Types.ObjectId(userId),
    companyId: mongoose.Types.ObjectId(companyId),
  };

  const userPatched = await patchUserCompanyId(patchUserData);

  if (!userPatched.success || !userPatched.data) {
    return false;
  }
  return true;
}
