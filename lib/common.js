import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';

dayjs.extend(utc);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

export const buildDateTimeISO = (dateValue, timeValue) => {
  let date = dayjs(dateValue);
  const time = timeValue.split(':');
  const hour = time[0];
  const minute = time[1];
  date = date.set('hour', hour);
  date = date.set('minute', minute);

  return date.toISOString();
};

export const buildLocalDateTime = (
  dateValue,
  calendarString = false
) => {
  let date;

  const time = dayjs(dateValue).$d.toString().substring(16, 21);

  if (calendarString) {
    if (dayjs(dateValue).utc().isToday()) {
      return { date: 'Today', time };
    }
    if (dayjs(dateValue).utc().isTomorrow()) {
      return { date: 'Tomorrow', time };
    }
  }

  date = dayjs(dateValue).utc().format('DD MMM');
  return { date, time };
};

export const buildLocalDate = (dateValue) => {
  return dayjs(dateValue).utc(true).format('YYYY-MM-DD');
};
