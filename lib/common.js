import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';

dayjs.extend(UTC);

export const buildDateTimeISO = (dateValue, timeValue) => {
  let date = dayjs(dateValue);
  const time = timeValue.split(':');
  const hour = time[0];
  const minute = time[1];
  date = date.set('hour', hour);
  date = date.set('minute', minute);

  return date.toISOString();
};
