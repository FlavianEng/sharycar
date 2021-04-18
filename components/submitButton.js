import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

export default function SubmitButton({
  label,
  onSubmit,
  errorMessage,
  isLoading,
}) {
  return (
    <form onSubmit={onSubmit}>
      <label
        htmlFor="email"
        className="block text-xl font-bold text-blueInk"
      >
        Email
      </label>
      <div className="mt-1 relative rounded-md shadow-md">
        <input
          type="email"
          name="email"
          id="email"
          className="focus:ring-1 focus:ring-blueInk focus:border-blueInk block w-80 py-3 px-4 border border-gray-300 rounded-md"
          placeholder="spongebob@example.com"
          inputMode="email"
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="flex w-80 place-content-center align-center p-2 cursor-pointer mt-4 bg-blueInk text-xl text-caribbeanGreen rounded-md font-bold hover:text-blueInk hover:bg-caribbeanGreen"
      >
        {isLoading ? (
          <span className="animate-spin w-7">
            <FontAwesomeIcon icon={faCircleNotch}></FontAwesomeIcon>
          </span>
        ) : (
          <>{label || 'Give me a name'}</>
        )}
      </button>
      {errorMessage && (
        <p className="absolute w-80 mt-4 font-bold text-wildStrawberry">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
