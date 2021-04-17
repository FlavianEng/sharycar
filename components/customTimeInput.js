import dayjs from 'dayjs';
import React, { useState } from 'react';
import styles from './customTimeInput.module.css';

export default function TimeInput() {
  const hour = dayjs().hour();
  const min = dayjs().minute();
  const safeMin = dayjs().subtract(2, 'minute').minute();
  const minute = min.toString().length === 2 ? min : `0${min}`;
  const safeMinute =
    safeMin.toString().length === 2 ? safeMin : `0${safeMin}`;

  const [timeValue, setTimeValue] = useState(`${hour}:${minute}`);

  return (
    <>
      <input
        id="time"
        min={`${hour}:${safeMinute}`}
        value={timeValue}
        onChange={(e) => {
          setTimeValue(e.target.value);
        }}
        type="time"
        className={`w-1/2 flex-grow text-center bg-transparent appearance-none font-medium font-monument text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 select-none ${styles.customTime}`}
      />
    </>
  );
}
