import React, { useEffect } from 'react';
import {
  faCircleNotch,
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
} from '../../lib/validators';
import {
  buildDateTimeISO,
  buildLocalDateTime,
} from '../../lib/common';
import {
  getJourneysByTimeOfDeparture,
  updateJourneyPassengersById,
  getJourneys,
} from '../../controllers/journey';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useUser } from '../../lib/hooks';

export default function FindRoute({
  handleClose,
  handleOpen,
  isOpened,
  displayErrorMessage,
  userData,
}) {
  useUser();
  dayjs.extend(isBetween);
  dayjs.extend(customParseFormat);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [inSearch, setInSearch] = useState(false);
  const [formValues, setFormValues, formValuesRef] = useState({
    date: null,
    time: null,
  });

  const [searchResults, setSearchResults] = useState([]);

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

  const searching = async (useFormValues = false) => {
    setLoadingSearch(true);
    let dateValue;
    let dateText;
    let timeValue;
    if (useFormValues) {
      const { date, time } = formValuesRef.current;
      dateValue = date.value;
      dateText = date.text;
      timeValue = time;
    } else {
      dateValue = document.querySelector('#date').value;
      dateText = document.querySelector('#date').textContent;
      timeValue = document.querySelector('#time').value;
    }
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
        setLoadingSearch(false);
        setInSearch(false);
        return displayErrorMessage(
          'The search has failed. Please try again later'
        );
      }

      if (!res.data.length) {
        setLoadingSearch(false);
        return displayErrorMessage('No results for this search');
      }

      const fineResults = await removesNotAvailableJourneys(
        res.data,
        1
      );

      if (fineResults.length < 1) {
        if (inSearch) {
          displayErrorMessage(
            'No more results for this search, you will be redirected'
          );
          setTimeout(() => setInSearch(false), 4000);
        } else {
          displayErrorMessage('No results for this search');
        }
        setLoadingSearch(false);
        return;
      }

      setSearchResults(fineResults);

      setInSearch(true);
      setLoadingSearch(false);
      return;
    }

    displayErrorMessage('Your search parameters are not valid');
  };

  // Removes journeys contained in already scheduled journey (in specified hour period)
  const removesNotAvailableJourneys = async (
    rawResults,
    hourPeriod
  ) => {
    const journeys = await getJourneys(
      userData.user._id,
      false,
      true
    );

    if (journeys.data.length <= 0) {
      // If human has no scheduled journeys
      // Return 1st search results
      return rawResults;
    }

    let toNotDisplay = [];
    for (let i = 0; i < rawResults.length; i++) {
      const rawResult = rawResults[i];

      const rawResultDatetime = rawResult.timeOfDeparture;

      for (let index = 0; index < journeys.data.length; index++) {
        const element = journeys.data[index];

        const newJourneyDateTime = dayjs(element.timeOfDeparture);

        const maxDateTime = newJourneyDateTime.add(
          hourPeriod,
          'hour'
        );

        const isBetween = dayjs(rawResultDatetime).isBetween(
          newJourneyDateTime,
          maxDateTime,
          null,
          '[]'
        );

        if (isBetween) {
          toNotDisplay.push(rawResult._id);
        }
      }
    }

    return rawResults.filter(
      (item) => !toNotDisplay.includes(item._id)
    );
  };

  const closeFindRoute = () => {
    setInSearch(false);
    handleClose();
  };

  const booking = async (journeyId) => {
    const userId = userData.user._id;

    const res = await updateJourneyPassengersById(journeyId, userId);

    if (!res.success || res.data.nModified !== 1 || !res) {
      displayErrorMessage(
        'Journey not booked ! We are sorry for the inconvenience'
      );
      return false;
    }

    searching(true);
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
                {loadingSearch ? (
                  <button
                    disabled={loadingSearch}
                    className="w-full rounded-md h-12 text-2xl focus:outline-none bg-blueInk text-caribbeanGreen select-none"
                  >
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      className="m-auto w-6 animate-spin"
                    ></FontAwesomeIcon>
                  </button>
                ) : (
                  <button
                    onClick={() => searching()}
                    disabled={loadingSearch}
                    className="w-full rounded-md h-12 bg-blueInk font-bold text-caribbeanGreen text-2xl focus:outline-none lg:hover:bg-caribbeanGreen lg:hover:text-blueInk duration-200"
                  >
                    <p>Search</p>
                  </button>
                )}
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
            className="flex w-72 rounded-md items-center text-caribbeanGreen bg-blueInk lg:hover:bg-caribbeanGreen lg:hover:text-blueInk h-20 shadow-xl cursor-pointer"
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
