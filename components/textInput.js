import React from 'react';

export default function TextInput({
  label,
  required,
  fieldId,
  inputType,
  placeholder,
  mode,
  customStyles,
  inputCustomStyles,
}) {
  return (
    <>
      <div className={`w-full lg:w-1/3 my-2 ${customStyles}`}>
        <div className="flex justify-between items-baseline">
          <label className="text-caribbeanGreen font-bold text-xl">
            {label || 'Label'}
          </label>
          <span
            className={`${
              required ? 'text-wildStrawberry' : 'text-blueInk-light'
            } font-bold text-sm`}
          >
            {required === true
              ? 'Required'
              : required === false
              ? 'Optional'
              : 'Read-only'}
          </span>
        </div>
        <input
          id={fieldId}
          key={fieldId}
          required={required}
          disabled={required === null}
          className={`w-full rounded-lg px-4 h-10 text-blueInk font-bold placeholder-wildStrawberry-light ${inputCustomStyles}`}
          type={'text' || inputType}
          placeholder={'' || placeholder}
          inputMode={mode || 'text'}
        ></input>
        <span
          id={`${fieldId}Error`}
          className="text-blueInk font-bold bg-wildStrawberry hidden"
        >
          Please provide a valid {label.toLowerCase()}
        </span>
      </div>
    </>
  );
}
