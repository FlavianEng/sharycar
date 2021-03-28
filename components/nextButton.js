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
}) {
  return (
    <div
      className={`w-full lg:w-10/12 flex mt-auto ${
        hasPrevious
          ? 'place-content-between lg:place-content-around'
          : 'place-content-center'
      }`}
    >
      {hasPrevious ? (
        <div
          className="flex justify-center items-center p-2 px-4 cursor-pointer bg-blueInk text-xl text-caribbeanGreen rounded-md font-bold hover:text-blueInk hover:bg-caribbeanGreen"
          onClick={
            onClickPrev ||
            console.log(
              'Tu viens de cliquer sur un bouton ! \nOh la la !\nComme je suis fier de toi !'
            )
          }
        >
          <button type="button"></button>{' '}
          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </div>
      ) : (
        false
      )}
      <div
        className="flex flex-row justify-center items-center p-2 px-16 cursor-pointer bg-blueInk text-2xl text-caribbeanGreen rounded-md font-bold hover:text-blueInk hover:bg-caribbeanGreen"
        onClick={
          onClickNext ||
          console.log(
            'Tu viens de cliquer sur un bouton ! \nOh la la !\nComme je suis fier de toi !'
          )
        }
      >
        <button type="button">Next</button>
        <FontAwesomeIcon
          className="max-w-icon flex-grow ml-4"
          icon={faArrowRight}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}
