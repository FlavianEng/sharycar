import React from 'react';
import Image from 'next/image';
import TextInput from './textInput';
import SelectInput from './selectInput';
import DateInput from './dateInput';
import SwitchButton from '../components/switchButton';
import Card from './card';
import Plan from './plan';
import styles from './registerFormPart.module.css';
import CodeGenerator from './codeGenerator';

//#region Common parts
export function addressPart(role) {
  return (
    <>
      <TextInput
        label="House number with street"
        required={true}
        fieldId="street"
      ></TextInput>
      <TextInput
        label="City / Post town"
        required={true}
        fieldId="city"
      ></TextInput>

      {role === 'company' && (
        <>
          <TextInput
            label="Country"
            required={true}
            fieldId="country"
          ></TextInput>
        </>
      )}
    </>
  );
}

export function contactPart(email) {
  return (
    <>
      <TextInput
        label="Email"
        required={null}
        fieldId="email"
        inputType="email"
        placeholder={email}
      ></TextInput>
      <TextInput
        label="Phone number"
        required={true}
        fieldId="phoneNumber"
        inputType="tel"
      ></TextInput>
    </>
  );
}

export function identityPart() {
  return (
    <>
      <TextInput
        label="First name"
        required={true}
        fieldId="firstName"
        placeholder=""
      ></TextInput>
      <TextInput
        label="Last name"
        required={true}
        fieldId="lastName"
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
}

export function switchPart() {
  return (
    <>
      <p className="text-caribbeanGreen text-center mt-16 text-2xl md:text-4xl font-bold">
        Are you an employee or the CEO ?
      </p>
      <div className="flex items-center justify-center mt-8 font-bold">
        <p className="text-caribbeanGreen pr-4">Employee</p>
        <SwitchButton switchId="switchRole"></SwitchButton>
        <p className="text-wildStrawberry px-4">CEO</p>
      </div>
    </>
  );
}

export function indexPart() {
  return (
    <>
      <p className="text-caribbeanGreen text-center mt-16 text-2xl md:text-4xl font-bold">
        As we have just met, I need some additional information to
        save you time
      </p>
      <p className="text-caribbeanGreen-dark text-center mt-20 font-bold text-md">
        Don&apos;t worry I am not Google, I won&apos;t sell your data
      </p>
    </>
  );
}

export function endScreen() {
  return (
    <>
      <p className="text-wildStrawberry font-bold text-xl p-8">
        Registration finished !
      </p>
      <div className="w-full lg:w-4/12 p-8">
        <Image
          priority
          key="endImg"
          alt="Registration finished image"
          src="/images/onBoard.png"
          layout="intrinsic"
          width={1000}
          height={654}
        ></Image>
      </div>
    </>
  );
}

//#endregion

//#region User parts
export function companyCodeInput() {
  return (
    <>
      <p className="text-wildStrawberry text-center mt-16 text-xl font-bold">
        You need this code to register with your company.
        <br />
        If you do not have a code, please contact your company for
        more information.
      </p>
      {/* EVO: Create a component that fetch compony code after a predefined by props waiting time */}
      {/* Instead of check the input value */}
      <TextInput
        label="Company code"
        required={true}
        fieldId="companyCode"
      ></TextInput>
    </>
  );
}
//#endregion

//#region Company parts
export function companyIdentityPart() {
  return (
    <>
      <TextInput
        label="Company name"
        required={true}
        fieldId="companyName"
      ></TextInput>
      <TextInput
        label="Registration number"
        required={true}
        fieldId="registrationNumber"
      ></TextInput>
      <TextInput
        label="Company nationality"
        required={true}
        fieldId="companyNationality"
      ></TextInput>
    </>
  );
}

// FIXME: This is not used, redo the function below
export function companyPlan(group) {
  return (
    <>
      <form>
        <div
          className={`place-items-center lg:place-content-center grid gap-x-4 -ml-10 lg:ml-0 grid-flow-col overflow-x-scroll lg:overflow-x-hidden overflow-y-hidden ${styles.cardWrapper}`}
        >
          <Card
            planName="Free"
            imgSrc="/images/chick.png"
            content={freeCardContent()}
            groupName={group}
            imgHeight={1000}
            imgWidth={1000}
          ></Card>
          <Card
            planName="Partial"
            imgSrc="/images/bird.png"
            content={partialCardContent()}
            groupName={group}
            imgHeight={900}
            imgWidth={1300}
          ></Card>
          <Card
            planName="Full"
            imgSrc="/images/cyborg-bird.png"
            content={fullCardContent()}
            groupName={group}
            imgHeight={900}
            imgWidth={1500}
          ></Card>
        </div>
      </form>
    </>
  );
}

// EVO: Refact the function above with this
export function companyChoosePlan() {
  return (
    <>
      {/* ClassNames when more than one plan activated */}
      {/* <div
        className={`place-items-center lg:place-content-center grid gap-x-4 -ml-10 mt-8 lg:ml-0 grid-flow-col overflow-x-scroll lg:overflow-x-hidden overflow-y-hidden ${styles.cardWrapper}`}
      > */}
      <div
        className={`place-items-center lg:place-content-center grid gap-x-4 -ml-4 mt-8 lg:ml-0 grid-flow-col overflow-x-scroll lg:overflow-x-hidden overflow-y-hidden ${styles.cardWrapper}`}
      >
        <Plan></Plan>

        {/* Hidden input with chosen plan value ID : #chosenPlan */}
      </div>
      <span
        id={'chosenPlanError'}
        className="text-blueInk font-bold bg-wildStrawberry mt-4 hidden"
      >
        Please choose a plan
      </span>
    </>
  );
}

export function companyRestrictArea() {
  return (
    <>
      <p className="text-wildStrawberry text-center mt-16 text-lg md:text-2xl font-bold">
        Please enter the email template used in your company.
        <br />
        This way, you can be sure only your employees can access this
        service
      </p>
      <div className="flex flex-row flex-wrap mt-16 text-sm md:text-2xl text-center font-bold my-2">
        <p className="text-wildStrawberry ">Example :</p>
        <p className="text-wildStrawberry-light ml-2">
          firstName.lastName@companyName.com
        </p>
      </div>
      <TextInput
        label="Email template"
        required={true}
        fieldId="emailTemplate"
      ></TextInput>
    </>
  );
}

export function companyShareCode(companyList) {
  return (
    <>
      <p className="text-wildStrawberry text-center mt-16 text-lg md:text-2xl font-bold">
        Your employees need this code to register with your company.
        <br />
        <br />
        Please remember to share it
      </p>
      <CodeGenerator
        fieldId="companyCode"
        companyCodes={companyList}
      ></CodeGenerator>
    </>
  );
}
//#endregion

//#region Card contents
function freeCardContent() {
  return (
    <>
      <ul className="font-bold text-blueInk list-disc list-inside mt-1">
        <li className="pb-2">You care about the planet</li>
        <li className="pb-2">
          You do not pay any transport costs of your employees
        </li>
        <li>
          This service costs you 10% of the monthly total transport
          costs
        </li>
      </ul>
    </>
  );
}

function partialCardContent() {
  return (
    <>
      <ul className="font-bold text-blueInk list-disc list-inside mt-1">
        <li className="pb-2">You care about the planet</li>
        <li className="pb-2">
          You pay 50% of transport costs of your employees
        </li>
        <li>
          This service costs you 5% of the monthly total transport
          costs
        </li>
      </ul>
    </>
  );
}

function fullCardContent() {
  return (
    <>
      <ul className="font-bold text-blueInk list-disc list-inside mt-1">
        <li className="pb-2">
          You care about your employees and the planet
        </li>
        <li className="pb-2">
          You pay 100% of transport costs of your employees
        </li>
        <li>
          This service costs you 1% of the monthly total transport
          costs
        </li>
      </ul>
    </>
  );
}
//#endregion
