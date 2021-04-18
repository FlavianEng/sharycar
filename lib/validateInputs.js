import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isSameOrAfter);
dayjs.extend(isToday);

const phoneRegex = new RegExp(
  '(\\+?( |-|\\.)?\\d{1,2}( |-|\\.)?)?(\\(?\\d{3}\\)?|\\d{3})( |-|\\.)?(\\d{3}( |-|\\.)?\\d{4})'
);

function findElement(elementId) {
  const errorMsg = document.querySelector(`#${elementId}Error`);
  const element = document.querySelector(`#${elementId}`);
  const isRequired = element.isRequired || element.ariaRequired;
  const elementValue = element.value;

  return { elementValue, errorMsg, isRequired };
}

function isValid(errorMsg) {
  errorMsg.classList.replace('visible', 'hidden');
  return true;
}

function isNotValid(errorMsg) {
  errorMsg.classList.replace('hidden', 'visible');
  return false;
}

export function validateCompanyCode(elementId) {
  const { elementValue, errorMsg } = findElement(elementId);
  if (elementValue.length === 6) {
    errorMsg.classList.replace('visible', 'hidden');
    return { validationSuccess: true, companyCode: elementValue };
  }
  errorMsg.classList.replace('hidden', 'visible');
  return { validationSuccess: false };
}

export function validateTextInput(elementId) {
  const { elementValue, errorMsg } = findElement(elementId);

  if (elementValue.toString().trim().length > 0) {
    return isValid(errorMsg);
  }
  return isNotValid(errorMsg);
}

export function validateGenderInput(elementId) {
  const { elementValue, errorMsg, isRequired } = findElement(
    elementId
  );

  if (isRequired === 'true') {
    if (
      elementValue === 'Man' ||
      elementValue === 'Woman' ||
      elementValue === 'Neither'
    ) {
      return isValid(errorMsg);
    }
    return isNotValid(errorMsg);
  }
  return isValid(errorMsg);
}

export function validatePhoneNumber(elementId) {
  const { elementValue, errorMsg } = findElement(elementId);

  if (phoneRegex.test(elementValue.replace(/\s/g, ''))) {
    return isValid(errorMsg);
  }
  return isNotValid(errorMsg);
}

export function validateChosenPlan(elementId) {
  const { elementValue, errorMsg } = findElement(elementId);

  if (
    elementValue === 'free' ||
    elementValue === 'partial' ||
    elementValue === 'full'
  ) {
    return isValid(errorMsg);
  }
  return isNotValid(errorMsg);
}

export function validateEmailTemplate(elementId) {
  const { elementValue, errorMsg } = findElement(elementId);

  // EVO: Validate Regex build
  if (elementValue.length > 0) {
    return isValid(errorMsg);
  }
  return isNotValid(errorMsg);
}

export const validateJourneyDate = (dateValue) => {
  if (
    dayjs(dateValue).isValid() &&
    (dayjs(dateValue).isSameOrAfter(dayjs().subtract(2, 'minutes')) ||
      dayjs(dateValue).isToday())
  ) {
    return true;
  }
  return false;
};

export const validateJourneyTime = (time) => {
  return time ? true : false;
};

// nbPassengers: value of the input
// maxNbPassengers: value of the human car
export const validateJourneyNbPassengers = (
  nbPassengers,
  maxNbPassengers
) => {
  if (
    maxNbPassengers &&
    nbPassengers &&
    nbPassengers <= maxNbPassengers &&
    typeof maxNbPassengers === 'number' &&
    typeof nbPassengers === 'number'
  ) {
    return true;
  }
  return false;
};

export const validateJourneyRoute = (from, to) => {
  if (from && to && from !== to) {
    return true;
  }
  return false;
};
