import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useState } from 'react';
import styles from './customDateInput.module.css';

export default function DateInput() {
  dayjs.extend(isToday);
  dayjs.extend(isTomorrow);
  dayjs.extend(customParseFormat);

  const [dateValue, setDateValue] = useState('Today');
  const [realDateValue, setRealDateValue] = useState(dayjs());

  const generateTextValue = (value = dateValue) => {
    if (dayjs(value).isToday()) {
      setDateValue('Today');
      return;
    }
    if (dayjs(value).isTomorrow()) {
      setDateValue('Tomorrow');
      return;
    }

    setDateValue(dayjs(value).format('DD MMM'));
    setRealDateValue(dayjs(value));
  };

  return (
    <>
      <input
        id="date"
        value={dateValue}
        onChange={(e) => {
          setDateValue(e.target.value);
        }}
        type="text"
        onFocus={(e) => {
          e.target.type = 'date';
          e.target.click(); // Not sure its useful
        }}
        onTouchStart={(e) => {
          e.target.type = 'date';
          e.target.click(); // Not sure its useful
        }}
        onBlur={(e) => {
          e.target.type = 'text';
          generateTextValue();
        }}
        onTouchEnd={(e) => {
          e.target.type = 'text';
          generateTextValue();
        }}
        className={`w-3/4 text-center bg-transparent appearance-none font-medium font-monument text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 rounded-none ${styles.customDate}`}
      />
      <input
        type="hidden"
        value={realDateValue}
        id="realDate"
        readOnly
      />
    </>
  );
}
