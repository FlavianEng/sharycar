import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { buildDateTimeISO } from '../../lib/common';
import {
  validateJourneyDate,
  validateJourneyNbPassengers,
  validateJourneyRoute,
  validateJourneyTime,
  verifyNoJourneySamePeriod,
} from '../../lib/validators';
import ConfirmBtn from '../confirmBtn';
import DateInput from '../customDateInput';
import TimeInput from '../customTimeInput';
import { createNewJourney } from '../../controllers/journey';
import dayjs from 'dayjs';
import { useUser } from '../../lib/hooks';

export default function CreateRoute({
  humanHasACar,
  handleClose,
  handleOpen,
  isOpened,
  displayErrorMessage,
  userData,
}) {
  useUser();
  const [hasWork, setHasWork] = useState({ from: false, to: true });

  const getSeats = () => {
    return userData?.car?.seats || 3;
  };
  const [seatsValue, setSeatsValue] = useState(3);

  const getAddresses = () => {
    if (userData?.user) {
      let addressList = [];
      userData.user.addressId.forEach((address) => {
        addressList.push({ name: address.name, id: address._id });
      });
      return addressList;
    } else {
      return [{ name: 'Home', id: 'Home' }];
    }
  };

  const [addressList, setAddressList] = useState([
    { name: 'Home', id: 'Home' },
  ]);

  const getWorkAddress = () => {
    return userData?.user?.companyId?.addressId || 'Work';
  };
  const [workAddress, setWorkAddress] = useState('Work');

  useEffect(() => {
    setSeatsValue(getSeats());
    setAddressList(getAddresses());
    setWorkAddress(getWorkAddress());
  }, [userData]);

  const generateAddressOptions = () => {
    if (userData?.user) {
      let options = [];

      for (let i = 0; i < addressList.length; i++) {
        const address = addressList[i];

        if (address.name === 'Home') {
          options.push(
            <option defaultValue key={address.id} value={address.id}>
              {address.name}
            </option>
          );
        } else {
          options.push(
            <option key={address.id} value={address.id}>
              {address.name}
            </option>
          );
        }
      }

      options.push(
        <option key={workAddress} value={workAddress}>
          Work
        </option>
      );
      return options;
    }
  };

  const getWorkAddressOption = () => {
    return (
      <option key={workAddress} value={workAddress}>
        Work
      </option>
    );
  };

  const [addressOptions, setAddressOptions] = useState({
    from: generateAddressOptions(),
    to: getWorkAddressOption(),
  });

  const setToHome = (id) => {
    const el = document.querySelector(`#${id}`);

    if (!el?.options) {
      return;
    }

    let optionsArray = [];
    for (let i = 0; i < el.options.length; i++) {
      const element = el.options[i];

      const isPushed = optionsArray.some(
        (item) => item.value === element.value
      );
      if (!isPushed) {
        optionsArray.push({
          name: element.text,
          value: element.value,
          index: element.index,
        });
      }
    }

    const homeIndex = optionsArray.find(
      (item) => item.name === 'Home'
    ).index;

    el.selectedIndex = homeIndex;
  };

  useEffect(() => {
    if (hasWork.from) {
      setAddressOptions({
        from: getWorkAddressOption(),
        to: generateAddressOptions(),
      });
    } else {
      setAddressOptions({
        from: generateAddressOptions(),
        to: getWorkAddressOption(),
      });
    }
  }, [hasWork, addressList]);

  useEffect(() => {
    if (hasWork.from) {
      setToHome('to');
    } else {
      setToHome('from');
    }
  }, [addressOptions]);

  const createJourney = async () => {
    const dateValue = document.querySelector('#date').value;
    const timeValue = document.querySelector('#time').value;
    const nbPassenger = document.querySelector('#nbPassenger').value;
    const from = document.querySelector('#from').value;
    const to = document.querySelector('#to').value;

    if (!validateJourneyRoute(from, to)) {
      displayErrorMessage(
        "Your starting location can't be your destination !"
      );
      return;
    }

    if (
      !validateJourneyNbPassengers(parseInt(nbPassenger), getSeats())
    ) {
      displayErrorMessage(
        "You can't offer more seats than you car has !"
      );
      return;
    }

    if (
      validateJourneyDate(dateValue) &&
      validateJourneyTime(timeValue) &&
      validateJourneyNbPassengers(
        parseInt(nbPassenger),
        getSeats()
      ) &&
      validateJourneyRoute(from, to)
    ) {
      const timeOfDeparture = buildDateTimeISO(dateValue, timeValue);

      const hasNotScheduledJourney = await verifyNoJourneySamePeriod(
        1,
        userData.user._id,
        timeOfDeparture
      );

      if (!hasNotScheduledJourney) {
        displayErrorMessage(
          'You already have a journey planned during that hour'
        );
        return false;
      }
      // EVO: Ask arrivalDate to human

      const journeyData = {
        driverId: userData.user._id,
        carId: userData.car._id,
        departure: from,
        destination: to,
        timeOfDeparture,
        maxPassengers: parseInt(getSeats()),
      };

      const res = await createNewJourney(journeyData);

      if (!res.success) {
        displayErrorMessage(
          'Something wrong happened. Please try again later'
        );
        return false;
      }

      setTimeout(() => {
        handleClose();
      }, 5000);
      return true;
    }

    displayErrorMessage('Please provide valid informations');
    return false;
  };

  return (
    <div className="my-4 lg:mx-4">
      <>
        {isOpened ? (
          <div className="flex flex-col w-72 rounded-md items-center">
            {/* Header */}
            <div
              onClick={handleClose}
              className="flex w-full h-10 justify-center items-center text-xl bg-wildStrawberry text-blueInk rounded-t-md cursor-pointer select-none"
            >
              <FontAwesomeIcon
                className="w-6 relative right-5 transform rotate-0 lg:hover:rotate-90 duration-200"
                icon={faTimes}
              ></FontAwesomeIcon>
              <h2 className="font-medium">Create a route</h2>
            </div>
            {/* Content */}
            <div className="flex flex-col p-4 justify-center text-2xl bg-blueInk w-full h-full rounded-b-md">
              <p className="font-bold text-wildStrawberry mb-2 select-none">
                I want to create a journey
              </p>
              <DateInput
                initialDate={dayjs().add(1, 'day').toDate()}
              ></DateInput>
              <div className="flex mt-2">
                <p className="font-bold text-wildStrawberry pr-4 select-none">
                  at
                </p>
                <TimeInput></TimeInput>
              </div>
              <div className="flex mt-2">
                <p className="font-bold text-wildStrawberry pr-4 select-none">
                  for
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  id="nbPassenger"
                  value={seatsValue}
                  onChange={(e) => {
                    setSeatsValue(e.target.value);
                  }}
                  className="w-1/4 text-center bg-transparent appearance-none font-medium font-monument text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 rounded-none "
                ></input>
                <p className="font-bold text-wildStrawberry pl-4 select-none">
                  passengers
                </p>
              </div>
              <div className="flex mt-4">
                <p className="font-bold text-wildStrawberry pr-4 select-none">
                  From
                </p>
                <select
                  id="from"
                  className={`${
                    hasWork.from
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  } w-4/6 cursor-pointer truncate bg-transparent appearance-none font-medium font-monument text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 rounded-none`}
                  onChange={(e) => {
                    e.target.selectedOptions[0].text === 'Work' &&
                      setHasWork({ from: true, to: false });
                  }}
                  disabled={hasWork.from}
                >
                  {addressOptions.from}
                </select>
              </div>
              <div className="flex mt-2">
                <p className="font-bold text-wildStrawberry pr-4 select-none">
                  To
                </p>
                <select
                  id="to"
                  className={`${
                    hasWork.to
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  } w-4/6 truncate bg-transparent appearance-none font-medium font-monument text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 rounded-none`}
                  onChange={(e) => {
                    e.target.selectedOptions[0].text === 'Work' &&
                      setHasWork({ from: false, to: true });
                  }}
                  disabled={hasWork.to}
                >
                  {addressOptions.to}
                </select>
              </div>
            </div>
            {/* Button */}
            <ConfirmBtn
              startLabel="Create"
              holdLabel="Hold to confirm"
              endLabel="Route created 🎉"
              btnWidth={18}
              handleSuccess={() => createJourney()}
            ></ConfirmBtn>
          </div>
        ) : (
          <div
            onClick={handleOpen}
            className={`flex w-72 rounded-md items-center text-wildStrawberry bg-blueInk lg:hover:bg-wildStrawberry lg:hover:text-blueInk h-20 ${
              humanHasACar
                ? 'shadow cursor-pointer'
                : 'cursor-not-allowed'
            }`}
          >
            <button
              className={`flex items-center m-auto font-monument font-bold text-xl focus:outline-none ${
                humanHasACar
                  ? 'opacity-100'
                  : 'opacity-50 text-wildStrawberry-dark'
              }`}
            >
              <FontAwesomeIcon
                className="w-6 "
                icon={faPlus}
              ></FontAwesomeIcon>
              <p className="px-4">Create a route</p>
            </button>
          </div>
        )}
      </>
    </div>
  );
}
