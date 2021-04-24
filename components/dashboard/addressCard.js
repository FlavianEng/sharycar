import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddressCard({
  addressName,
  handleDelete,
  street,
  city,
  isHome,
}) {
  return (
    <div className="flex flex-col w-72 lg:w-96 rounded-md items-center m-8 mt-0">
      {/* Header */}
      <div className="flex flex-col w-full p-2 justify-center items-center text-xl bg-caribbeanGreen text-blueInk rounded-t-md select-none">
        <div className="flex w-full justify-center items-center">
          <h2 className={'font-medium mx-auto'}>
            <p>{addressName || "Carpooling area of Arthur's seat"}</p>
          </h2>
          {!isHome && (
            <span
              className="relative pr-4 lg:hover:text-error text-caribbeanGreen-dark cursor-pointer appearance-none outline-none"
              onClick={handleDelete}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="w-6"
              ></FontAwesomeIcon>
            </span>
          )}
        </div>
      </div>
      {/* Content */}

      <div className="flex flex-col px-2 py-4 text-sm bg-blueInk w-full rounded-b-md select-none">
        {/* First line */}
        <div className="flex mb-1 whitespace-nowrap">
          <h2 className="text-wildStrawberry mr-2 font-medium">
            Street :
          </h2>
          <p className="text-caribbeanGreen font-bold">
            {street || '37 Dolmen road'}
          </p>
        </div>
        {/* Second line */}
        <div className="flex mb-1">
          <h2 className="text-wildStrawberry mr-2 font-medium whitespace-nowrap">
            City :
          </h2>
          <p className="text-caribbeanGreen font-bold">
            {city || 'Edinburgh'}
          </p>
        </div>
      </div>
    </div>
  );
}
