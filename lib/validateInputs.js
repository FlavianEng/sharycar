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

  // TODO: Validate Regex build
  if (elementValue.length > 0) {
    return isValid(errorMsg);
  }
  return isNotValid(errorMsg);
}
