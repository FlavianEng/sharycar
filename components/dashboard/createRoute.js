import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ConfirmBtn from '../confirmBtn';
import DateInput from '../customDateInput';
import TimeInput from '../customTimeInput';

export default function CreateRoute({
  humanHasACar,
  handleClose,
  handleOpen,
  isOpened,
}) {
  const [numberValue, setNumberValue] = useState(3);

  return (
    <div className="my-4 lg:mx-4">
      <>
        {isOpened ? (
          <div className="flex flex-col w-72 rounded-md items-center">
            {/* Header */}
            <div
              onClick={handleClose}
              className="flex w-full h-10 justify-center items-center text-xl bg-wildStrawberry text-blueInk rounded-t-md cursor-pointer"
            >
              <FontAwesomeIcon
                className="w-6 relative right-5 rotate-0 hover:rotate-90 duration-200"
                icon={faTimes}
              ></FontAwesomeIcon>
              <h2 className="font-medium">Create a route</h2>
            </div>
            {/* Content */}
            <div className="flex flex-col p-4 justify-center text-2xl bg-blueInk w-full h-full rounded-b-md">
              <p className="font-bold text-wildStrawberry mb-2">
                I want to create a journey
              </p>
              <DateInput></DateInput>
              <div className="flex mt-2">
                <p className="font-bold text-wildStrawberry pr-4">
                  at
                </p>
                <TimeInput></TimeInput>
              </div>
              <div className="flex mt-2">
                <p className="font-bold text-wildStrawberry pr-4">
                  for
                </p>
                <input
                  type="text"
                  id="nbPassenger"
                  value={numberValue}
                  onChange={(e) => {
                    setNumberValue(e.target.value);
                  }}
                  className="w-1/4 text-center bg-transparent appearance-none font-medium font-monument text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 rounded-none "
                ></input>
                <p className="font-bold text-wildStrawberry pl-4">
                  passengers
                </p>
              </div>
              <div className="flex mt-4">
                <p className="font-bold text-wildStrawberry pr-4">
                  From
                </p>
                <select
                  id="from"
                  className="w-4/6 truncate bg-transparent appearance-none font-medium font-monument text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 rounded-none "
                >
                  <option value="Home" defaultValue>
                    Home
                  </option>
                  <option value="Garden">Garden</option>
                  <option value="">VERYYYYYY LONG TOPTION</option>
                </select>
              </div>
              <div className="flex mt-2">
                <p className="font-bold text-wildStrawberry pr-4">
                  To
                </p>
                <select
                  id="to"
                  className="w-4/6 truncate bg-transparent appearance-none font-medium font-monument text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 rounded-none "
                >
                  <option value="Work" defaultValue>
                    Work
                  </option>
                </select>
              </div>
            </div>
            {/* Button */}
            <ConfirmBtn
              startLabel="Create"
              holdLabel="Hold to confirm"
              endLabel="Route created 🎉"
              btnWidth={18}
              handleSuccess={() =>
                console.log('Do SOMETHING GREAT KIDDO')
              }
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
              className={`flex items-center m-auto font-monument font-bold text-xl focus:outline-none focus: ${
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
