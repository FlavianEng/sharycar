import React from 'react';
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

export default function FindRoute({
  handleClose,
  handleOpen,
  isOpened,
}) {
  const [inSearch, setInSearch] = useState(false);
  const [formValues, setFormValues, formValuesRef] = useState({
    date: null,
    time: null,
  });

  const searching = () => {
    setFormValues({
      date: document.querySelector('#date').value,
      time: document.querySelector('#time').value,
    });
    setInSearch(true);
  };

  const closeFindRoute = () => {
    setInSearch(false);
    handleClose();
  };

  // FIXME : Datepicker

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
                  {formValuesRef.current.date}
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
                <DateInput></DateInput>
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
                  className="w-full rounded-md h-10 bg-blueInk font-bold text-caribbeanGreen text-2xl focus:outline-none lg:hover:bg-caribbeanGreen lg:hover:text-blueInk duration-200"
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
                <SmallCard
                  handleConfirmation={() =>
                    setTimeout(() => setInSearch(false), 3000)
                  }
                  name="Bobby"
                ></SmallCard>
                <SmallCard
                  handleConfirmation={() =>
                    setTimeout(() => setInSearch(false), 3000)
                  }
                ></SmallCard>
                <SmallCard
                  handleConfirmation={() =>
                    setTimeout(() => setInSearch(false), 3000)
                  }
                  name="Bobette"
                ></SmallCard>
                <SmallCard
                  handleConfirmation={() =>
                    setTimeout(() => setInSearch(false), 3000)
                  }
                  name="Boberd"
                ></SmallCard>
                <SmallCard
                  handleConfirmation={() =>
                    setTimeout(() => setInSearch(false), 3000)
                  }
                  name="Bobnard"
                ></SmallCard>
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
