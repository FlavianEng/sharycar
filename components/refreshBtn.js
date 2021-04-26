import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RefreshBtn({ isVisible, closeRefresh }) {
  return (
    <>
      <div
        className={`w-11/12 mt-4 z-50 bg-error rounded-lg absolute ${
          isVisible ? 'block' : 'hidden'
        }`}
      >
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-error-dark text-lg">
                👎
              </span>
              <p className="ml-3 font-bold text-white">
                <span className="">
                  Seems like there is a problem. Please restart the
                  application !
                </span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className="-mr-1 flex p-2 rounded-md lg:hover:bg-error-dark focus:outline-none sm:-mr-2"
                onClick={closeRefresh}
              >
                <span className="sr-only">Dismiss</span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="w-6"
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
