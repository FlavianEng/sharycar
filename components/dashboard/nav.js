import {
  faAddressBook,
  faCar,
  faHome,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const { asPath } = useRouter();

  return (
    <>
      <h2 className="flex justify-center items-center text-wildStrawberry text-lg p-2 font-medium lg:hidden">
        Sharycar
      </h2>
      <div className="flex bg-blueInk justify-evenly items-end w-screen h-12 rounded-t-md lg:rounded-none fixed bottom-0 lg:top-0 z-40">
        <h2 className="text-wildStrawberry text-lg pl-4 self-center font-medium hidden lg:block">
          Sharycar
        </h2>
        {/* Home icon */}
        <Link href="dashboard">
          <div
            className={`select-none cursor-pointer flex flex-col items-center justify-center h-full flex-grow text-sm ${
              asPath === '/user/dashboard'
                ? 'text-wildStrawberry'
                : 'text-caribbeanGreen'
            }`}
          >
            <FontAwesomeIcon
              className="w-6"
              icon={faHome}
            ></FontAwesomeIcon>
            <p className="font-bold">Home</p>
          </div>
        </Link>
        {/* Car icon */}
        <Link href="journey">
          <div
            className={`select-none cursor-pointer flex flex-col items-center justify-center h-full flex-grow text-sm ${
              asPath === '/user/journey'
                ? 'text-wildStrawberry'
                : 'text-caribbeanGreen'
            }`}
          >
            <FontAwesomeIcon
              className="w-6"
              icon={faCar}
            ></FontAwesomeIcon>
            <p className="font-bold">Journey</p>
          </div>
        </Link>
        {/* Address icon */}
        <div
          className={`select-none cursor-not-allowed flex flex-col items-center justify-center h-full flex-grow text-sm ${
            asPath === '/'
              ? 'text-wildStrawberry'
              : 'text-caribbeanGreen'
          }`}
        >
          <FontAwesomeIcon
            className="w-6 text-xs"
            icon={faAddressBook}
          ></FontAwesomeIcon>
          <p className="font-bold">Address</p>
        </div>
        {/* Profile icon */}
        <div
          className={`select-none cursor-not-allowed flex flex-col items-center justify-center h-full flex-grow text-sm ${
            asPath === '/'
              ? 'text-wildStrawberry'
              : 'text-caribbeanGreen'
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
