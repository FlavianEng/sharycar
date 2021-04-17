import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ConfirmBtn from '../confirmBtn';

export default function SmallCard({
  booked = false,
  handleConfirmation,
  name,
  date,
  time,
  seats,
  from,
  to,
  isLast,
}) {
  return (
    <>
      <div
        className={`flex flex-col w-72 rounded-md items-center my-8 ${
          isLast ? 'mb-20' : ''
        }`}
      >
        {/* Header */}
        <div className="flex w-full h-10 justify-center items-center text-xl bg-caribbeanGreen text-blueInk rounded-t-md">
          <h2 className="font-medium">{name || 'Bob'}</h2>
          {booked && (
            <span className="relative left-3 lg:hover:text-error text-caribbeanGreen-dark cursor-pointer">
              <FontAwesomeIcon
                icon={faTrash}
                className="w-6"
              ></FontAwesomeIcon>
            </span>
          )}
        </div>
        {/* Content */}

        <div className="flex flex-col p-4 text-sm bg-blueInk w-full rounded-b-md">
          {/* First line */}
          <div className="flex mb-1">
            <h2 className="text-wildStrawberry mr-2 font-medium">
              Departure :
            </h2>
            <p className="text-caribbeanGreen font-bold">
              {date || '16/11'}
            </p>
            <h2 className="text-wildStrawberry ml-4 mr-2 font-medium">
              at :
            </h2>
            <p className="text-caribbeanGreen font-bold">
              {time || '09h00'}
            </p>
          </div>
          {/* Second line */}
          <div className="flex mb-1">
            <h2 className="text-wildStrawberry mr-2 font-medium">
              Remaining seats :
            </h2>
            <p className="text-caribbeanGreen font-bold">
              {seats || '2'}
            </p>
          </div>
          {/* Third line */}
          <div className="flex mb-1">
            <h2 className="text-wildStrawberry mr-2 font-medium">
              From :
            </h2>
            <p className="text-caribbeanGreen font-bold">
              {from || 'Parking du jardin public'}
            </p>
          </div>
          {/* Fourth line */}
          <div className="flex">
            <h2 className="text-wildStrawberry mr-2 font-medium">
              To :
            </h2>
            <p className="text-caribbeanGreen font-bold">
              {to || 'Work'}
            </p>
          </div>
        </div>

        <ConfirmBtn
          startLabel="Get on board"
          holdLabel="Hold to confirm"
          endLabel="Journey booked 🎉"
          btnWidth={18}
          handleSuccess={handleConfirmation}
        ></ConfirmBtn>
      </div>
    </>
  );
}
