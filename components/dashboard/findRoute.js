import React, { useEffect } from 'react';
import {
  faSearch,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useState from 'react-usestateref';
import DateInput from '../customDateInput';
import TimeInput from '../customTimeInput';
import SmallCard from './smallCard';
import {
  validateJourneyDate,
  validateJourneyTime,
} from '../../lib/validateInputs';
import {
  buildDateTimeISO,
  buildLocalDateTime,
} from '../../lib/common';
import {
  getJourneysByTimeOfDeparture,
  updateJourneyPassengersById,
} from '../../controllers/journey';
import dayjs from 'dayjs';

export default function FindRoute({
  handleClose,
  handleOpen,
  isOpened,
  displayErrorMessage,
  userData,
}) {
  const [inSearch, setInSearch] = useState(false);
  const [formValues, setFormValues, formValuesRef] = useState({
    date: null,
    time: null,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [resultCard, setResultCard] = useState([]);

  const generateResultCard = () => {
    let cards = [];

    for (let i = 0; i < searchResults.length; i++) {
      const element = searchResults[i];

      const departure =
        element.departure.name === 'Company'
          ? 'Work'
          : `${element.departure.street}, ${element.departure.city}`;

      const destination =
        element.destination.name === 'Company'
          ? 'Work'
          : `${element.destination.street}, ${element.destination.city}`;

      const seats = element.maxPassengers - element.passengers.length;

      const { date, time } = buildLocalDateTime(
        element.timeOfDeparture,
        true
      );

      const name = `${
        element.driverId.firstName
      } ${element.driverId.lastName.substring(0, 1)}.`;

      cards.push(
        <SmallCard
          handleConfirmation={() => booking(element._id)}
          name={name}
          date={date}
          time={time}
          seats={seats}
          from={departure}
          to={destination}
          key={element._id}
        ></SmallCard>
      );
    }

    return cards;
  };

  useEffect(() => {
    generateResultCard();
  }, [searchResults]);

  // TODO : DISPLAY A LOADING ANIMATION DURING SEARCHING
  const searching = async () => {
    const dateValue = document.querySelector('#date').value;
    const dateText = document.querySelector('#date').textContent;
    const timeValue = document.querySelector('#time').value;
    const userId = userData?.user._id;

    if (
      validateJourneyDate(dateValue) &&
      validateJourneyTime(timeValue)
    ) {
      setFormValues({
        date: { text: dateText, value: dateValue },
        time: timeValue,
      });

      const dateTime = buildDateTimeISO(dateValue, timeValue);

      const res = await getJourneysByTimeOfDeparture(
        dateTime,
        userId
      );

      if (!res.success) {
        return displayErrorMessage(
          'The search has failed. Please try again later'
        );
      }

      if (!res.data.length) {
        return displayErrorMessage('No results for this search');
      }

      setSearchResults(res.data);

      setInSearch(true);
      return;
    }

    displayErrorMessage('Your search parameters are not valid');
  };

  const closeFindRoute = () => {
    setInSearch(false);
    handleClose();
  };

  const booking = async (journeyId) => {
    // TODO: Check if human hasn't already a journey for the same period

    const res = await updateJourneyPassengersById(
      journeyId,
      userData.user._id
    );

    if (!res.success || res.data.n !== 1 || !res) {
      displayErrorMessage(
        'Journey not booked ! We are sorry for the inconvenience'
      );
      return false;
    }

    // If success
    setTimeout(() => setInSearch(false), 3000);
    return true;
  };

  return (
    <div className="my-4 lg:mx-4">
      <>
        {isOpened ? (
          <div className="flex flex-col w-72 rounded-md items-center">
            {/* Header */}
            <div
              onClick={closeFindRoute}
              className="flex w-full h-10 justify-center items-center text-xl bg-caribbeanGreen text-blueInk rounded-t-md cursor-pointer"
            >
              <FontAwesomeIcon
                className="w-6 relative right-8 transform rotate-0 lg:hover:rotate-90 duration-200"
                icon={faTimes}
              ></FontAwesomeIcon>
              <h2 className="font-medium">Find a route</h2>
            </div>
            {/* Content */}
            {inSearch ? (
              <div className="flex p-4 justify-evenly items-center text-xl bg-blueInk text-caribbeanGreen font-monument font-medium w-full rounded-b-md">
                <p className="border-b-2 border-caribbeanGreen">
                  {formValuesRef.current.date.text}
                </p>
                <p className="border-b-2 border-caribbeanGreen">
                  {formValuesRef.current.time}
                </p>
                <span
                  onClick={() => setInSearch(false)}
                  className="relative left-3 lg:hover:text-error text-caribbeanGreen-dark cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="w-6"
                  ></FontAwesomeIcon>
                </span>
              </div>
            ) : (
              <div className="flex flex-col p-4 justify-center text-2xl bg-blueInk w-full h-48 rounded-b-md">
                <p className="font-bold text-wildStrawberry mb-2">
                  I want to book a journey
                </p>
                <DateInput initialDate={dayjs().toDate()}></DateInput>
                <div className="flex mt-2">
                  <p className="font-bold text-wildStrawberry pr-4">
                    at
                  </p>
                  <TimeInput></TimeInput>
                </div>
              </div>
            )}

            {!inSearch && (
              <>
                {/* Dashed line */}
                <span className="border-b-2 border-blueInk border-dashed w-64">
                  {' '}
                </span>

                {/* Button */}
                <button
                  onClick={() => searching()}
                  className="w-full rounded-md h-12 bg-blueInk font-bold text-caribbeanGreen text-2xl focus:outline-none lg:hover:bg-caribbeanGreen lg:hover:text-blueInk duration-200"
                >
                  Search
                </button>
              </>
            )}

            {inSearch && (
              <>
                <div className="flex p-4 justify-center items-center text-xl bg-wildStrawberry text-blueInk font-monument font-medium w-full rounded-md">
                  <h2>Search results</h2>
                </div>
                {generateResultCard()}
              </>
            )}
          </div>
        ) : (
          <div
            onClick={handleOpen}
            className="flex w-72 rounded-md items-center text-caribbeanGreen bg-blueInk lg:hover:bg-caribbeanGreen lg:hover:text-blueInk h-20 shadow cursor-pointer"
          >
            <button className="flex items-center m-auto font-monument font-bold text-xl focus:outline-none">
              <FontAwesomeIcon
                className="w-6 "
                icon={faSearch}
              ></FontAwesomeIcon>
              <p className="px-4">Find a route</p>
            </button>
          </div>
        )}
      </>
    </div>
  );
}
