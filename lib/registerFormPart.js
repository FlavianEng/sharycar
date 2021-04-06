import { createAddress } from '../controllers/address';
import {
  createCompany,
  getCompanyFromCompanyCode,
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
    postCode: document.querySelector('#postCode').value,
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
  const addressData = {
    street: values.street,
    city: values.city,
    postCode: values.postCode,
    country: values.country,
  };

  const addressResult = await createAddress(addressData);
  const addressId = addressResult.address._id;

  const companyResult = await getCompanyFromCompanyCode(
    values.companyCode
  );
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

  if (!userResult.success) {
    return false;
  }
  return true;
}

export async function submitCompanyRegistration(values) {
  const addressData = {
    street: values.street,
    city: values.city,
    postCode: values.postCode,
    country: values.country,
  };

  const addressResult = await createAddress(addressData);
  const addressId = addressResult.address._id;

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
  const userId = userResult.data._id;

  const companyData = {
    creatorId: mongoose.Types.ObjectId(userId),
    addressId: mongoose.Types.ObjectId(addressId),
    companyName: values.companyName,
    companyNationality: values.companyNationality,
    registrationNumber: values.registrationNumber,
    plan: values.plan,
    emailTemplate: values.emailTemplate,
    companyCode: values.companyCode,
  };

  const companyResult = await createCompany(companyData);
  const companyId = companyResult.company._id;

  const patchUserData = {
    id: mongoose.Types.ObjectId(userId),
    companyId: mongoose.Types.ObjectId(companyId),
  };

  const userPatched = await patchUserCompanyId(patchUserData);

  if (!userPatched.success) {
    return false;
  }
  return true;
}
