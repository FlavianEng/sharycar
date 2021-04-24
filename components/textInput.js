import React, { useEffect, useState } from 'react';

export default function TextInput({
  label,
  required,
  fieldId,
  inputType,
  placeholder,
  mode,
  customStyles,
  inputCustomStyles,
  edit,
  noHelper,
  disabled,
  initialValue = '',
  handleEdit,
  saveEdition,
}) {
  const [startValue, setValue] = useState(initialValue);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setValue(initialValue);
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

          {!noHelper && (
            <div>
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
                  {required === true
                    ? 'Required'
                    : required === false
                    ? 'Optional'
                    : 'Read-only'}
                </span>
              )}
            </div>
          )}
        </div>
        <input
          id={fieldId}
          key={fieldId}
          required={required}
          disabled={required === null || disabled}
          className={`w-full rounded-lg px-4 h-10 text-blueInk font-bold placeholder-wildStrawberry-light ${
            disabled && 'text-wildStrawberry-light'
          } ${inputCustomStyles}`}
          type={'text' || inputType}
          placeholder={'' || placeholder}
          inputMode={mode || 'text'}
          value={startValue}
          onChange={(e) => setValue(e.target.value)}
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
