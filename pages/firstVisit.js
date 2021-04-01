import React, { useEffect, useState } from 'react';
import NextButton from '../components/nextButton';
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
  error,
} from '../components/registerFormPart';
import {
  saveCompanyCode,
  saveRole,
  saveUserAddress,
  saveUserContact,
  saveUserIdentity,
} from '../lib/registerFormPart';

const FirstVisit = () => {
  const user = useUser();
  const [page, setPage] = useState(0);
  const hasPrevPage = page === 0 ? false : true;

  const [title, setTitle] = useState('Hey there');
  const [content, setContent] = useState(indexPart());
  // Form values
  const [formValues, setFormValues] = useState({ role: '' });

  const saveFormValues = () => {
    if (page === 1) {
      setFormValues(saveRole(formValues));
    }

    if (page === 2) {
      if (formValues.role === 'user') {
        // TODO: Check if company exists
        setFormValues(saveCompanyCode(formValues));
      }
    }

    if (page === 3) {
      if (formValues.role === 'user') {
        setFormValues(saveUserIdentity(formValues));
      }
    }
    if (page === 4) {
      if (formValues.role === 'user') {
        setFormValues(saveUserContact(formValues, user.email));
      }
    }
    if (page === 5) {
      if (formValues.role === 'user') {
        setFormValues(saveUserAddress(formValues));
      }
    }
    console.log(formValues);
  };

  useEffect(() => {
    switch (page) {
      case 0:
        setTitle('Hey there !');
        setContent(indexPart());
        break;
      case 1:
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
            throw new Error('Seems like your lost (oopsi)');
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
            throw new Error('Seems like your lost (oopsi)');
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
            throw new Error('Seems like your lost (oopsi)');
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
            throw new Error('Seems like we lost the title (oopsi !)');
        }
        break;
      case 6:
        switch (formValues.role) {
          case 'user':
            setTitle('Welcome on board !');
            setContent(endScreen());
            break;
          case 'company':
            setTitle('Choose your plan');
            setContent(companyChoosePlan());
            break;
          default:
            throw new Error('Seems like we lost the title (oopsi !)');
        }
        break;
      case 7:
        // TODO: Verify whether or not user can go here (expected not to)
        setTitle('Restrict the area');
        setContent(companyRestrictArea());
        break;
      case 8:
        // TODO: Verify whether or not user can go here (expected not to)
        setTitle('Share your company code');
        setContent(companyShareCode());
        break;
      case 9:
        setTitle('Welcome on board !');
        setContent(endScreen());
        break;
      default:
        setTitle('Look ma ! This is broken !');
        setContent(error());
      // TODO: Error page, go back to signIn
    }
  }, [page]);

  return (
    <div className="w-screen h-screen bg-registerBack">
      <div className="flex flex-col h-full items-center p-10 md:p-20">
        <h2 className="text-caribbeanGreen text-3xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
        {content}
        <pre className="text-yellow-300">Page numéro {page}</pre>
        <pre className="text-yellow-300">
          {formValues && formValues.role}
        </pre>

        <NextButton
          hasPrevious={hasPrevPage}
          onClickPrev={() => setPage(page - 1)}
          onClickNext={() => {
            saveFormValues();
            setPage(page + 1);
          }}
        ></NextButton>
      </div>
    </div>
  );
};

export default FirstVisit;
