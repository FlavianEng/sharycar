import React, { useEffect, useState } from 'react';
import NextButton from '../components/nextButton';
import SwitchButton from '../components/switchButton';
import TextInput from '../components/textInput';
import SelectInput from '../components/selectInput';
import DateInput from '../components/dateInput';
import { useUser } from '../lib/hooks';

const FirstVisit = () => {
  const user = useUser();
  const [page, setPage] = useState(0);
  const hasPrevPage = page === 0 ? false : true;
  const initContent = (
    <>
      <p className="text-caribbeanGreen text-center mt-16 text-2xl md:text-4xl font-bold">
        As we have just met, I need some additional information to
        save you time
      </p>
      <p className="text-caribbeanGreen-dark text-center mt-20 font-bold text-md">
        Don&apos;t worry I am not Google, I don&apos;t sell your data
      </p>
    </>
  );
  const [title, setTitle] = useState('Hey there');
  const [content, setContent] = useState(initContent);
  // Form values
  const [formValues, setFormValues] = useState({ role: '' });
  const saveFormValues = () => {
    if (page === 1) {
      setFormValues({
        ...formValues,
        role: document.querySelector('#switchRole').checked
          ? 'company'
          : 'user',
      });
    }
    if (page === 2) {
      setFormValues({
        ...formValues,
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        gender: document.querySelector('#gender').value,
        birthday: document.querySelector('#birthday').value,
      });
    }
    if (page === 3) {
      setFormValues({
        ...formValues,
        email: user.email,
        phoneNumber: document.querySelector('#phoneNumber').value,
      });
    }
    if (page === 4) {
      setFormValues({
        ...formValues,
        streetNumber: document.querySelector('#streetNumber').value,
        street: document.querySelector('#street').value,
        city: document.querySelector('#city').value,
        postalCode: document.querySelector('#postalCode').value,
        country: document.querySelector('#country').value,
      });
    }
    console.log(formValues);
  };

  useEffect(() => {
    switch (page) {
      //#region all roles
      case 0:
        setTitle('Hey there !');
        setContent(initContent);
        break;
      case 1:
        setTitle('Before we start !');

        setContent(
          <>
            <p className="text-caribbeanGreen text-center mt-16 text-2xl md:text-4xl font-bold">
              Are you an employee or the CEO ?
            </p>
            <div className="flex items-center justify-center mt-8 font-bold">
              <p className="text-caribbeanGreen pr-4">Employee</p>
              <SwitchButton></SwitchButton>
              <p className="text-wildStrawberry px-4">CEO</p>
            </div>
          </>
        );
        break;
      case 2:
        setTitle('Tell me more about you');
        setContent(
          <>
            <TextInput
              label="First name"
              required={true}
              fieldId="firstName"
              inputType="text"
              placeholder=""
            ></TextInput>
            <TextInput
              label="Last name"
              required={true}
              fieldId="lastName"
              inputType="text"
            ></TextInput>
            <SelectInput
              label="Gender"
              required={true}
              fieldId="gender"
              options={['Man', 'Woman', 'Neither']}
            ></SelectInput>
            <DateInput
              label="Birthday"
              required={false}
              fieldId="birthday"
            ></DateInput>
          </>
        );
        break;
      case 3:
        setTitle('Tell me more about you');
        setContent(
          <>
            <TextInput
              label="Email"
              required={null}
              fieldId="email"
              inputType="email"
              placeholder={user.email}
            ></TextInput>
            <TextInput
              label="Phone number"
              required={true}
              fieldId="phoneNumber"
              inputType="tel"
            ></TextInput>
          </>
        );
        break;
      //#endregion
      case 4:
        switch (formValues.role) {
          case 'user':
            setTitle('Tell me more about you');
            break;
          case 'company':
            setTitle('About your company');
            break;
          default:
            throw new Error('Seems like we lost the title (oopsi !)');
        }
        setContent(
          <>
            <TextInput
              label="Street number"
              required={true}
              fieldId="streetNumber"
              inputType="text"
            ></TextInput>
            <TextInput
              label="Street"
              required={true}
              fieldId="street"
              inputType="text"
            ></TextInput>
            <TextInput
              label="City"
              required={true}
              fieldId="city"
              inputType="text"
            ></TextInput>
            <TextInput
              label="Zip / Postal code"
              required={true}
              fieldId="postalCode"
              inputType="number"
            ></TextInput>
            <TextInput
              label="Country"
              required={true}
              fieldId="country"
              inputType="text"
            ></TextInput>
          </>
        );
        break;
      case 5:
        switch (formValues.role) {
          case 'user':
            setTitle('Enter the company code');
            setContent(
              <>
                <p className="text-wildStrawberry text-center mt-16 text-xl font-bold">
                  You need this code to register with your company.
                  <br />
                  If you do not have a code, please contact your
                  company for more information.
                </p>
                {/* EVO: Create a component that fetch compony code after a predefined by props waiting time */}
                {/* Instead of check the input value */}
                <TextInput
                  label="Company code"
                  required={true}
                  fieldId="companyCode"
                  inputType="text"
                ></TextInput>
              </>
            );
            break;
          case 'company':
            setTitle('About your company');
            setContent(
              <>
                <p>TODO: Write this</p>
              </>
            );
            break;
          default:
            throw new Error('Seems like your lost (oopsi)');
        }
        break;
      default:
        setTitle('Registration');
        setContent('Error');
      // TODO: Error page, go back to signIn
    }
  }, [page]);

  return (
    <div className="w-screen h-screen bg-registerBack">
      <div className="flex flex-col h-full justify-top items-center p-10 md:p-20">
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
