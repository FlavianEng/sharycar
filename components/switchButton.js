import React, { useState } from 'react';

export default function SwitchButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <>
      <input
        type="checkbox"
        id="switchRole"
        checked={isOn}
        onChange={() => setIsOn(!isOn)}
        className="h-0 w-0 invisible"
      />
      <label
        htmlFor="switchRole"
        className={`${
          isOn ? 'bg-wildStrawberry' : 'bg-caribbeanGreen'
        } relative flex items-center px-2 flex-shrink-0 h-14 transition-colors duration-200 ease-in-out border-0 rounded-2xl cursor-pointer w-36 focus:outline-none focus:shadow-outline`}
      >
        <span
          className={` ${
            isOn ? 'translate-x-20' : 'translate-x-0'
          } inline-block w-12 h-12 transition duration-200 ease-in-out transform bg-white shadow-sm rounded-xl`}
        />
      </label>
    </>
  );
}
