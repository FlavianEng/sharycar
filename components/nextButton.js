import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

export default function NextButton({
  hasPrevious,
  onClickNext,
  onClickPrev,
  nextLabel,
}) {
  return (
    <div
      className={`w-full lg:w-10/12 flex mt-auto select-none ${
        hasPrevious
          ? 'place-content-between lg:place-content-around'
          : 'place-content-center'
      }`}
    >
      {hasPrevious ? (
        <div
          className="flex justify-center items-center p-2 px-4 cursor-pointer bg-blueInk text-xl text-caribbeanGreen rounded-md font-bold hover:text-blueInk hover:bg-caribbeanGreen appearance-none"
          onClick={
            onClickPrev ||
            console.log(
              'Tu viens de cliquer sur un bouton ! \nOh la la !\nComme je suis fier de toi !'
            )
          }
        >
          <button type="button" className="appearance-none"></button>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="w-6"
          ></FontAwesomeIcon>
        </div>
      ) : (
        false
      )}
      <div
        className="flex flex-row justify-center items-center p-2 px-16 cursor-pointer bg-blueInk text-2xl text-caribbeanGreen rounded-md font-bold hover:text-blueInk hover:bg-caribbeanGreen appearance-none"
        onClick={
          onClickNext ||
          console.log(
            'Tu viens de cliquer sur un bouton ! \nOh la la !\nComme je suis fier de toi !'
          )
        }
      >
        <a
          className="focus:outline-none appearance-none"
          type="button"
        >
          {nextLabel || 'Next'}
        </a>
        <FontAwesomeIcon
          className="w-6 flex-grow ml-4"
          icon={faArrowRight}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}
