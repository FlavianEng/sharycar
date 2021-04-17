import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import DateInput from '../customDateInput';
import TimeInput from '../customTimeInput';

export default function FindRoute({
  handleClose,
  handleOpen,
  isOpened,
}) {
  return (
    <div className="my-4 lg:mx-4">
      <>
        {isOpened ? (
          <div className="flex flex-col w-72 rounded-md items-center">
            {/* Header */}
            <div
              onClick={handleClose}
              className="flex w-full h-10 justify-center items-center text-xl bg-caribbeanGreen text-blueInk rounded-t-md cursor-pointer"
            >
              <FontAwesomeIcon
                className="w-6 relative right-8 transform rotate-0 hover:rotate-90 duration-200"
                icon={faTimes}
              ></FontAwesomeIcon>
              <h2 className="font-medium">Find a route</h2>
            </div>
            {/* Content */}
            <div className="flex flex-col p-4 justify-center text-2xl bg-blueInk w-full h-48 rounded-b-md">
              <p className="font-bold text-wildStrawberry mb-2">
                I want to book a journey
              </p>
              <DateInput></DateInput>
              <div className="flex mt-2">
                <p className="font-bold text-wildStrawberry pr-4">
                  at
                </p>
                <TimeInput></TimeInput>
              </div>
            </div>
            {/* Dashed line */}
            <span className="border-b-2 border-blueInk border-dashed w-64">
              {' '}
            </span>
            {/* Button */}
            <button className="w-full rounded-md h-10 bg-blueInk font-bold text-caribbeanGreen text-2xl focus:outline-none lg:hover:bg-caribbeanGreen lg:hover:text-blueInk duration-200">
              Search
            </button>
          </div>
        ) : (
          <div
            onClick={handleOpen}
            className="flex w-72 rounded-md items-center text-caribbeanGreen bg-blueInk lg:hover:bg-caribbeanGreen lg:hover:text-blueInk h-20 shadow cursor-pointer"
          >
            <button className="flex items-center m-auto font-monument font-bold text-xl focus:outline-none">
              <FontAwesomeIcon
                className="w-6 "
                icon={faSearch}
              ></FontAwesomeIcon>
              <p className="px-4">Find a route</p>
            </button>
          </div>
        )}
      </>
    </div>
  );
}
