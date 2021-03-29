import React from 'react';

export default function TextInput({ label, required, fieldId }) {
  return (
    <>
      <div className="w-full my-2">
        <div className="flex justify-between items-baseline">
          <label className="text-caribbeanGreen font-bold text-xl">
            {label || 'Label'}
          </label>
          <span
            className={`${
              required ? 'text-wildStrawberry' : 'text-blueInk-light'
            } font-bold text-sm`}
          >
            {required ? 'Required' : 'Optional'}
          </span>
        </div>
        <input
          id={fieldId}
          className="w-full rounded-lg px-4 h-10"
          type="text"
        ></input>
      </div>
    </>
  );
}
