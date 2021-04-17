import {
  faAddressBook,
  faCar,
  faHome,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

// TODO: Verify if customStyle is useful
export default function Nav({ customStyle }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <h2 className="text-wildStrawberry text-lg p-2 mt-2 top-0 font-medium">
        Sharycar
      </h2>
      <div
        className={`flex bg-blueInk justify-evenly items-end w-full h-12 rounded-t-md fixed bottom-0 ${customStyle}`}
      >
        {/* Home icon */}
        <div
          className={`flex flex-col items-center justify-center h-full flex-grow text-sm ${
            isActive ? 'text-wildStrawberry' : 'text-caribbeanGreen'
          }`}
        >
          <FontAwesomeIcon
            className="w-6"
            icon={faHome}
          ></FontAwesomeIcon>
          <p className="font-bold">Home</p>
        </div>
        {/* Car icon */}
        <div
          className={`flex flex-col items-center justify-center h-full flex-grow text-sm ${
            isActive ? 'text-wildStrawberry' : 'text-caribbeanGreen'
          }`}
        >
          <FontAwesomeIcon
            className="w-6"
            icon={faCar}
          ></FontAwesomeIcon>
          <p className="font-bold">Journey</p>
        </div>
        {/* Address icon */}
        <div
          className={`flex flex-col items-center justify-center h-full flex-grow text-sm ${
            isActive ? 'text-wildStrawberry' : 'text-caribbeanGreen'
          }`}
        >
          <FontAwesomeIcon
            className="w-6"
            icon={faAddressBook}
          ></FontAwesomeIcon>
          <p className="font-bold">Address</p>
        </div>
        {/* Profile icon */}
        <div
          className={`flex flex-col items-center justify-center h-full flex-grow text-sm ${
            isActive ? 'text-wildStrawberry' : 'text-caribbeanGreen'
          }`}
        >
          <FontAwesomeIcon
            className="w-6"
            icon={faIdCard}
          ></FontAwesomeIcon>
          <p className="font-bold">Profile</p>
        </div>
      </div>
    </>
  );
}
