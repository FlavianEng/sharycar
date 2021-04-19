import React, { useState } from 'react';

export default function SelectInput({
  label,
  required,
  fieldId,
  options,
}) {
  const activeOption = null;

  const setChoices = (isInit = true, id) => {
    let choices = {};

    options.forEach((element) => {
      if (element === id && !isInit) {
        choices = { ...choices, [element]: true };
        document.querySelector(`#${fieldId}`).value = id;
      } else {
        choices = { ...choices, [element]: false };
      }
    });

    return choices;
  };

  const [choices, setActiveChoice] = useState(setChoices());

  const activateChoice = (e) => {
    const id = e.target.id;
    setActiveChoice(setChoices(false, id));
  };

  const optionTemplate = Object.keys(choices).map((key) => (
    <button
      id={key}
      key={key}
      value={choices[key]}
      onClick={activateChoice}
      className={`${
        choices[key]
          ? 'text-wildStrawberry bg-caribbeanGreen'
          : 'text-gray-400'
      }  font-bold h-5/6 w-auto rounded-md mx-1 px-2 lg:hover:bg-caribbeanGreen lg:hover:text-wildStrawberry focus:outline-none`}
    >
      {key}
    </button>
  ));

  return (
    <div className="w-full lg:w-1/3 my-2">
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
      <div
        id={fieldId}
        aria-required={required}
        value={activeOption}
        className="w-full rounded-lg px-4 h-10 bg-white flex items-center justify-between"
      >
        {optionTemplate}
      </div>
      <span
        id={`${fieldId}Error`}
        className="text-blueInk font-bold bg-wildStrawberry hidden"
      >
        Please provide a valid {label.toLowerCase()}
      </span>
    </div>
  );
}
