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

  // Fake value => Date to string
  const [dateValue, setDateValue] = useState('Today');
  // Real value => Date
  const [realDateValue, setRealDateValue] = useState(
    dayjs().toISOString()
  );

  const generateTextValue = (value = dateValue) => {
    if (!dayjs(value).isValid()) {
      setDateValue('Today');
      setRealDateValue(dayjs().toISOString());
      return;
    }

    if (dayjs(value).isToday()) {
      setDateValue('Today');
    } else if (dayjs(value).isTomorrow()) {
      setDateValue('Tomorrow');
    } else {
      setDateValue(dayjs(value).format('DD MMM'));
    }

    setRealDateValue(dayjs(value).toISOString());
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
        onFocusCapture={(e) => {
          e.target.type = 'date';
          e.target.click(); // Not sure its useful
        }}
        onTouchStartCapture={(e) => {
          e.target.type = 'date';
          e.target.click(); // Not sure its useful
        }}
        onBlurCapture={(e) => {
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
