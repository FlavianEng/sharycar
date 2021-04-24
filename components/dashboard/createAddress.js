import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ConfirmBtn from '../confirmBtn';
import TextInput from '../../components/textInput';
import {
  validateAddressNameInput,
  validateTextInput,
} from '../../lib/validators';
import {
  createAddress,
  deleteAddress,
} from '../../controllers/address';
import { updateUserAddresses } from '../../controllers/user';

export default function CreateAddress({
  isOpened,
  handleClose,
  handleOpen,
  userId,
  companyNationality,
  error,
  refreshAddresses,
}) {
  const addressCreation = async () => {
    if (!userId || !companyNationality) {
      error('Something wrong happened ! Please refresh the page ');
      return false;
    }

    if (
      validateTextInput('street') &&
      validateTextInput('city') &&
      validateAddressNameInput('addressName') &&
      userId &&
      companyNationality
    ) {
      const street = document.querySelector('#street').value;
      const city = document.querySelector('#city').value;
      const addressName = document.querySelector('#addressName')
        .value;

      const addressData = {
        name: addressName,
        street,
        city,
        country: companyNationality,
      };

      const address = await createAddress(addressData);

      if (!address.success || !address.data) {
        error('Address creation has failed !');
        return false;
      }

      const patchUserAddress = {
        id: userId,
        address: address.data._id,
      };

      const user = await updateUserAddresses(patchUserAddress);

      if (!user.success || user.data.nModified !== 1) {
        error("User's addresses update has failed !");
        // If update fail, remove address
        await deleteAddress(address.data._id);
        return false;
      }

      await refreshAddresses();

      return true;
    }
  };

  return (
    <div className="my-4 mx-auto lg:mx-4 lg:ml-40">
      <>
        {isOpened ? (
          <div className="flex flex-col w-72 lg:w-96 rounded-md items-center">
            {/* Header */}
            <div
              onClick={handleClose}
              className="flex w-full h-10 justify-center items-center text-xl bg-caribbeanGreen text-blueInk rounded-t-md select-none"
            >
              <FontAwesomeIcon
                className="w-6 text-lg relative right-2 transform rotate-0 lg:hover:rotate-90 duration-200 lg:hidden"
                icon={faTimes}
              ></FontAwesomeIcon>
              <h2 className="font-medium text-lg pl-1">
                Create an address
              </h2>
            </div>
            {/* Content */}
            <div className="flex flex-col p-4 justify-center text-base bg-blueInk w-full h-full rounded-b-md">
              <TextInput
                label="House number with street"
                required={true}
                fieldId="street"
                customStyles="lg:w-full"
                inputCustomStyles="bg-transparent border-b-2 border-wildStrawberry lg:hover:border-caribbeanGreen rounded-b-none focus:border-caribbeanGreen focus:ring-2 focus:ring-caribbeanGreen focus:outline-none text-wildStrawberry cursor-pointer"
              ></TextInput>
              <TextInput
                label="City / Post town"
                required={true}
                fieldId="city"
                customStyles="lg:w-full"
                inputCustomStyles="bg-transparent border-b-2 border-wildStrawberry lg:hover:border-caribbeanGreen rounded-b-none focus:border-caribbeanGreen focus:ring-2 focus:ring-caribbeanGreen focus:outline-none text-wildStrawberry cursor-pointer"
              ></TextInput>
              <TextInput
                label="Address name"
                required={true}
                fieldId="addressName"
                customStyles="lg:w-full"
                inputCustomStyles="bg-transparent border-b-2 border-wildStrawberry lg:hover:border-caribbeanGreen rounded-b-none focus:border-caribbeanGreen focus:ring-2 focus:ring-caribbeanGreen focus:outline-none text-wildStrawberry cursor-pointer"
              ></TextInput>
            </div>
            {/* Button */}
            <ConfirmBtn
              startLabel="Create"
              holdLabel="Hold to confirm"
              endLabel="Address created 🎉"
              btnWidth={18}
              handleSuccess={() => addressCreation()}
            ></ConfirmBtn>
          </div>
        ) : (
          <div
            onClick={handleOpen}
            className="flex w-72 rounded-md items-center text-caribbeanGreen bg-blueInk lg:hover:bg-caribbeanGreen lg:hover:text-blueInk p-4 cursor-pointer"
          >
            <button className="flex items-center m-auto font-monument font-bold text-xl focus:outline-none">
              <FontAwesomeIcon
                className="w-6 "
                icon={faPlus}
              ></FontAwesomeIcon>
              <p className="px-4">New address</p>
            </button>
          </div>
        )}
      </>
    </div>
  );
}
