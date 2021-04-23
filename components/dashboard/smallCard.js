import {
  faTrash,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ConfirmBtn from '../confirmBtn';

export default function SmallCard({
  booked = false,
  handleConfirmation,
  handleDelete,
  name,
  date,
  time,
  seats,
  from,
  to,
  phoneNumber,
}) {
  return (
    <>
      <div className="flex flex-col w-72 rounded-md items-center m-8">
        {/* Header */}
        <div className="flex flex-col w-full p-2 justify-center items-center text-xl bg-caribbeanGreen text-blueInk rounded-t-md select-none">
          <div className="flex w-full justify-center items-center">
            <h2 className={`font-medium mx-auto ${booked && 'pl-4'}`}>
              {booked ? (
                <p>{name || 'Patrick'}</p>
              ) : (
                <p>{name || 'Bob'}</p>
              )}
            </h2>
            {booked && (
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
          {booked && (
            <div className="flex w-full justify-center items-center">
              <FontAwesomeIcon
                icon={faPhoneAlt}
                className="text-base w-6"
              ></FontAwesomeIcon>
              <p className="pl-4 font-bold text-base">
                {phoneNumber || '+44 1632 960212'}
              </p>
            </div>
          )}
        </div>
        {/* Content */}

        <div className="flex flex-col px-2 py-4 text-sm bg-blueInk w-full rounded-b-md select-none">
          {/* First line */}
          <div className="flex mb-1 whitespace-nowrap">
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
            <h2 className="text-wildStrawberry mr-2 font-medium whitespace-nowrap">
              Remaining seats :
            </h2>
            <p className="text-caribbeanGreen font-bold">
              {seats || '2'}
            </p>
          </div>
          {/* Third line */}
          <div className="flex mb-1">
            <h2 className="text-wildStrawberry mr-2 font-medium whitespace-nowrap">
              From :
            </h2>
            <p className="text-caribbeanGreen font-bold">
              {from || 'Parking du jardin public'}
            </p>
          </div>
          {/* Fourth line */}
          <div className="flex">
            <h2 className="text-wildStrawberry mr-2 font-medium whitespace-nowrap">
              To :
            </h2>
            <p className="text-caribbeanGreen font-bold">
              {to || 'Work'}
            </p>
          </div>
        </div>
        {!booked && (
          <ConfirmBtn
            startLabel="Get on board"
            holdLabel="Hold to confirm"
            endLabel="Journey booked 🎉"
            btnWidth={18}
            handleSuccess={handleConfirmation}
          ></ConfirmBtn>
        )}
      </div>
    </>
  );
}
