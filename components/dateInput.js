import React from 'react';
import Dayjs from 'dayjs';

export default function DateInput({
  label,
  required,
  fieldId,
  valueIsNull,
}) {
  return (
    <>
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
        <input
          id={fieldId}
          key={fieldId}
          className="w-full rounded-lg px-6 h-10 font-bold text-gray-400"
          type="date"
          onChange={valueIsNull}
          max={Dayjs().format('YYYY/MM/DD')}
          min={Dayjs().subtract(100, 'year').format('YYYY/MM/DD')}
          pattern={'[0-9]{2}-[0-9]{2}-[0-9]{4}'}
        ></input>
      </div>
    </>
  );
}
