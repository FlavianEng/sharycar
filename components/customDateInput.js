import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useState, forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput({ initialDate }) {
  dayjs.extend(isToday);
  dayjs.extend(isTomorrow);
  dayjs.extend(customParseFormat);

  const [dateValue, setDateValue] = useState(initialDate);
  const inputRef = React.createRef();

  const [textValue, setTextValue] = useState('Date');

  const generateText = (value) => {
    if (dayjs(value).isToday() || !dayjs(value).isValid()) {
      setTextValue('Today');
    } else if (dayjs(value).isTomorrow()) {
      setTextValue('Tomorrow');
    } else {
      setTextValue(dayjs(value).format('DD MMM'));
    }
  };

  useEffect(() => {
    generateText(dateValue);
  }, []);

  const customTextRender = (props, ref) => {
    return (
      <button
        id="date"
        className="w-3/4 text-center bg-transparent font-medium font-monument appearance-none text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 rounded-none"
        onClick={props.onClick}
        ref={ref}
        value={props.value}
      >
        {textValue}
      </button>
    );
  };
  const CustomText = forwardRef(customTextRender);

  return (
    <DatePicker
      selected={dateValue}
      todayButton="Today"
      onChange={(date) => {
        setDateValue(date);
        generateText(date);
      }}
      minDate={new Date()}
      customInput={<CustomText ref={inputRef} />}
      showPopperArrow={false}
      popperModifiers={{
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
        },
      }}
      className="w-3/4 text-center bg-transparent font-medium font-monument appearance-none text-caribbeanGreen border-b-2 border-caribbeanGreen focus:outline-none focus:ring-0 rounded-none"
    />
  );
}
