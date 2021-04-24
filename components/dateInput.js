import React, { useState, useEffect } from 'react';
import Dayjs from 'dayjs';
import { buildLocalDate } from '../lib/common';

export default function DateInput({
  label,
  required,
  fieldId,
  edit,
  customStyles,
  inputCustomStyles,
  disabled,
  initialValue = '',
  handleEdit,
  saveEdition,
}) {
  const [startValue, setValue] = useState(initialValue);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const date = buildLocalDate(initialValue);
    setValue(date);
  }, [initialValue]);

  const toggleEdition = () => {
    handleEdit();

    if (!editing) {
      setEditing('Save');
    } else {
      saveEdition();
      setEditing(false);
    }
  };

  return (
    <>
      <div className={`w-full lg:w-1/3 my-2 ${customStyles}`}>
        <div className="flex justify-between items-baseline">
          <label className="text-caribbeanGreen font-bold text-xl">
            {label || 'Label'}
          </label>
          {edit ? (
            <span
              className={`${
                editing
                  ? 'text-wildStrawberry'
                  : 'text-caribbeanGreen-dark'
              } font-bold text-sm p-2 cursor-pointer select-none`}
              onClick={() => toggleEdition()}
            >
              {editing ? 'Save' : 'Edit'}
            </span>
          ) : (
            <span
              className={`${
                required
                  ? 'text-wildStrawberry'
                  : 'text-blueInk-light'
              } font-bold text-sm`}
            >
              {required ? 'Required' : 'Optional'}
            </span>
          )}
        </div>
        <input
          id={fieldId}
          key={fieldId}
          disabled={disabled}
          className={`w-full rounded-lg px-6 h-10 font-bold text-gray-400 appearance-none ${inputCustomStyles}`}
          type="date"
          value={startValue}
          onChange={(e) => setValue(e.target.value)}
          max={Dayjs().format('YYYY-MM-DD')}
          min={Dayjs().subtract(100, 'year').format('YYYY-MM-DD')}
          pattern={'[0-9]{2}-[0-9]{2}-[0-9]{4}'}
        ></input>
      </div>
    </>
  );
}
