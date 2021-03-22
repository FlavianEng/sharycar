import React from 'react';

export default function SubmitButton({
  label,
  onSubmit,
  errorMessage,
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
          placeholder="bobleponge@example.com"
        />
      </div>
      <button
        type="submit"
        className="flex w-80 place-content-center align-center p-2 cursor-pointer mt-4 bg-blueInk text-xl text-caribbeanGreen rounded-md font-bold hover:text-blueInk hover:bg-caribbeanGreen"
      >
        {label || 'Give me a label'}
      </button>
      {/* TODO : Mettre en forme le message d'erreur */}
      {/* TODO : Onclick Regex email */}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
