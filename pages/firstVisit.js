import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import NextButton from '../components/nextButton';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import {
  addressPart,
  switchPart,
  identityPart,
  contactPart,
  companyCodeInput,
  indexPart,
  companyIdentityPart,
  companyChoosePlan,
  companyRestrictArea,
  companyShareCode,
  endScreen,
} from '../components/registerFormPart';
import {
  saveChosenPlan,
  saveCompanyCode,
  saveCompanyIdentity,
  saveEmailTemplate,
  saveRole,
  saveUserAddress,
  saveUserContact,
  saveUserIdentity,
  submitCompanyRegistration,
  submitUserRegistration,
} from '../lib/registerFormPart';
import {
  validateChosenPlan,
  validateCompanyCode,
  validateEmailTemplate,
  validateGenderInput,
  validatePhoneNumber,
  validateTextInput,
} from '../lib/validateInputs';
import { getCompanyCodes } from '../controllers/company';
import { ErrorBanner } from '../components/errorBanner';
import { getUserFromEmail } from '../controllers/user';

export default function FirstVisit({ companyList }) {
  if (!companyList.success || !companyList.data) {
    Router.push('error');
    return;
  }

  const companyCodes = companyList.data.map(
    (element) => element.companyCode
  );

  const user = useUser();
  // Redirect if user isn't found
  useUser({ redirectTo: '/signIn', redirectIfFound: false });

  const [page, setPage] = useState(0);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [nextLabel, setNextLabel] = useState('Next');
  const [hasALink, setHasALink] = useState(false);
  const [dashboardLink, setDashboardLink] = useState('');
  const [title, setTitle] = useState('Hey there');
  const [content, setContent] = useState(indexPart());
  const [errorBanner, setErrorBanner] = useState(false);
  const [errorBannerMsg, setErrorBannerMsg] = useState('Error');

  // Form values
  const [formValues, setFormValues, formValuesRef] = useState({
    role: '',
  });

  const saveFormValues = async () => {
    switch (page) {
      case 1:
        setFormValues(saveRole(formValues));
        setPage(page + 1);
        break;
      case 2:
        if (formValues.role === 'user') {
          const {
            validationSuccess,
            companyCode,
          } = validateCompanyCode('companyCode');
          if (validationSuccess) {
            const company = companyCodes.find(
              (code) => code === companyCode
            );

            if (company) {
              setFormValues(saveCompanyCode(formValues));
              setErrorBanner(false);
              setPage(page + 1);
              return;
            }
            setErrorBannerMsg('This company code does not exist !');
            setErrorBanner(true);
          }
        }
        if (formValues.role === 'company') {
          const firstName = validateTextInput('firstName');
          const lastName = validateTextInput('lastName');
          const gender = validateGenderInput('gender');

          if (firstName && lastName && gender) {
            setFormValues(saveUserIdentity(formValues));
            setPage(page + 1);
          }
        }
        break;

      case 3:
        if (formValues.role === 'user') {
          const firstName = validateTextInput('firstName');
          const lastName = validateTextInput('lastName');
          const gender = validateGenderInput('gender');

          if (firstName && lastName && gender) {
            setFormValues(saveUserIdentity(formValues));
            setPage(page + 1);
          }
        }
        if (formValues.role === 'company') {
          const phoneNumber = validatePhoneNumber('phoneNumber');
          if (phoneNumber) {
            setFormValues(saveUserContact(formValues, user.email));
            setPage(page + 1);
          }
        }
        break;

      case 4:
        if (formValues.role === 'user') {
          const phoneNumber = validatePhoneNumber('phoneNumber');
          if (phoneNumber) {
            setFormValues(saveUserContact(formValues, user.email));
            setPage(page + 1);
          }
        }
        if (formValues.role === 'company') {
          const street = validateTextInput('street');
          const city = validateTextInput('city');
          const postCode = validateTextInput('postCode');
          const country = validateTextInput('country');

          if (street && city && postCode && country) {
            setFormValues(saveUserAddress(formValues));
            setPage(page + 1);
          }
        }
        break;

      case 5:
        if (formValues.role === 'user') {
          const street = validateTextInput('street');
          const city = validateTextInput('city');
          const postCode = validateTextInput('postCode');
          const country = validateTextInput('country');

          if (street && city && postCode && country) {
            setFormValues(saveUserAddress(formValues));
            const isAlreadyRegistered = await getUserFromEmail(
              encodeURIComponent(user.email)
            );

            if (isAlreadyRegistered.data) {
              setErrorBannerMsg('You are already registered !');
              setErrorBanner(true);
              setTimeout(() => {
                Router.push('user/dashboard');
              }, 5000);
              return;
            }

            if (await submitUserRegistration(formValuesRef.current)) {
              setPage(page + 1);
              return;
            } else {
              Router.push('error');
              throw new Error('Error during user registration');
            }
          }
        }

        if (formValues.role === 'company') {
          const companyName = validateTextInput('companyName');
          const registrationNumber = validateTextInput(
            'registrationNumber'
          );
          const companyNationality = validateTextInput(
            'companyNationality'
          );

          if (
            companyName &&
            registrationNumber &&
            companyNationality
          ) {
            setFormValues(saveCompanyIdentity(formValues));
            setPage(page + 1);
          }
        }
        break;

      case 6:
        const chosenPlan = validateChosenPlan('chosenPlan');
        if (chosenPlan) {
          setFormValues(saveChosenPlan(formValues));
          setPage(page + 1);
        }
        break;
      case 7:
        const emailTemplate = validateEmailTemplate('emailTemplate');
        if (emailTemplate) {
          setFormValues(saveEmailTemplate(formValues));
          setPage(page + 1);
        }
        break;
      case 8:
        setFormValues(saveCompanyCode(formValues));

        const isAlreadyRegistered = await getUserFromEmail(
          encodeURIComponent(user.email)
        );

        if (isAlreadyRegistered.data) {
          // TODO: Redirect to route that match with human role
          setErrorBannerMsg('You are already registered !');
          setErrorBanner(true);
          setTimeout(() => {
            Router.push('company/dashboard');
          }, 5000);
          return;
        }

        if (await submitCompanyRegistration(formValuesRef.current)) {
          setPage(page + 1);
          return;
        } else {
          Router.push('error');
          throw new Error('Error during company registration');
        }

      default:
        setPage(page + 1);
        break;
    }
  };

  useEffect(async () => {
    switch (page) {
      case 0:
        setHasPrevPage(false);
        setTitle('Hey there !');
        setContent(indexPart());
        break;
      case 1:
        setHasPrevPage(true);
        setTitle('Before we start !');
        setContent(switchPart());
        break;
      case 2:
        switch (formValues.role) {
          case 'user':
            setTitle('Enter the company code');
            setContent(companyCodeInput());
            break;
          case 'company':
            setTitle('Tell me more about you');
            setContent(identityPart());
            break;
          default:
            Router.push('error');
            throw new Error('Unable to handle unknown role');
        }
        break;
      case 3:
        switch (formValues.role) {
          case 'user':
            setTitle('Tell me more about you');
            setContent(identityPart());
            break;
          case 'company':
            setTitle('Tell me more about you');
            setContent(contactPart(user.email));
            break;
          default:
            Router.push('error');
            throw new Error('Unable to handle unknown role');
        }
        break;
      case 4:
        switch (formValues.role) {
          case 'user':
            setTitle('Tell me more about you');
            setContent(contactPart(user.email));
            break;
          case 'company':
            setTitle('About your company');
            setContent(addressPart());
            break;
          default:
            Router.push('error');
            throw new Error('Unable to handle unknown role');
        }
        break;
      case 5:
        switch (formValues.role) {
          case 'user':
            setTitle('Tell me more about you');
            setContent(addressPart());
            break;
          case 'company':
            setTitle('About your company');
            setContent(companyIdentityPart());
            break;
          default:
            Router.push('error');
            throw new Error('Unable to handle unknown role');
        }
        break;
      case 6:
        switch (formValues.role) {
          case 'user':
            setDashboardLink('user/dashboard');
            setHasALink(true);
            setNextLabel('Skip');
            setHasPrevPage(false);
            setTitle('Welcome on board !');
            setContent(endScreen());
            break;
          case 'company':
            setTitle('Choose your plan');
            setContent(companyChoosePlan());
            break;
          default:
            Router.push('error');
            throw new Error('Unable to handle unknown role');
        }
        break;
      case 7:
        setTitle('Restrict the area');
        setContent(companyRestrictArea());
        break;
      case 8:
        setTitle('Share your company code');
        setContent(companyShareCode(companyCodes));
        break;
      case 9:
        setDashboardLink('company/dashboard');
        setHasALink(true);
        setNextLabel('Skip');
        setHasPrevPage(false);
        setTitle('Welcome on board !');
        setContent(endScreen());
        break;
      default:
        Router.push('error');
        throw new Error(
          'Unable to handle page state with value :',
          page
        );
    }
  }, [page]);

  return (
    <div className="w-screen h-screen bg-registerBack bg-no-repeat">
      <div className="flex flex-col h-screen-95 items-center px-10 pt-4 pb-10 md:p-20">
        <ErrorBanner
          isVisible={errorBanner}
          closeBanner={() => setErrorBanner(false)}
          errorMsg={errorBannerMsg}
        ></ErrorBanner>
        <h2 className="text-caribbeanGreen text-3xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
        {content}
        {/* <pre className="text-yellow-300">Page numéro {page}</pre>
        <pre className="text-yellow-300">
          {formValues && formValues.role}
        </pre> */}
        <NextButton
          hasPrevious={hasPrevPage}
          onClickPrev={() => setPage(page - 1)}
          onClickNext={() => {
            // FIXME: Hover stay active after click on this button
            if (hasALink) {
              Router.push(dashboardLink);
              return;
            }
            saveFormValues();
          }}
          nextLabel={nextLabel}
        ></NextButton>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const companyList = await getCompanyCodes(true, req);

  return { props: { companyList } };
}
