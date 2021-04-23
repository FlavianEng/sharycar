import React from 'react';

export default function DeleteModal({
  closeModal,
  confirmAction,
  isVisible,
}) {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isVisible ? 'block' : 'hidden'
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 z-50">
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-blueInk rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-blueInk px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-wildStrawberry-light sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-wildStrawberry-dark"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-wildStrawberry"
                  id="modal-title"
                >
                  Remove this journey
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-caribbeanGreen font-bold">
                    Are you sure you want to remove this journey ?
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blueInk px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={confirmAction}
              type="button"
              className="font-bold w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-error text-base text-BlueInk lg:hover:bg-error-dark focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              I am sure ! Remove !
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="font-bold mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base border-2 border-transparent text-caribbeanGreen lg:hover:border-caribbeanGreen focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}