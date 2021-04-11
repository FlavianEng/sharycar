import React, { useState } from 'react';
import Image from 'next/image';

export default function Plan() {
  // EVO: Refactor this
  const options = ['free', 'partial', 'full'];

  const setChoices = (isInit = true, id) => {
    let choices = {};

    options.forEach((element) => {
      if (element === id && !isInit) {
        choices = { ...choices, [element]: true };
        document.querySelector('#chosenPlan').value = id;
      } else {
        choices = { ...choices, [element]: false };
      }
    });

    return choices;
  };

  const [choices, setActiveChoice] = useState(setChoices());

  const activatePlan = (e) => {
    const id = e.target.id;
    setActiveChoice(setChoices(false, id));
  };

  return (
    <>
      {/* Free plan */}
      <div className="w-72 h-96 bg-white rounded-md shadow-lg flex flex-col justify-between items-center px-6 py-3 flex-grow-0 flex-shrink-0">
        <h2 className="font-medium text-wildStrawberry text-2xl px-4 py-2">
          Free
        </h2>
        <div className="w-24">
          <Image
            priority
            alt="Free plan image"
            src="/images/chick.png"
            layout="intrinsic"
            width={1000}
            height={1000}
          ></Image>
        </div>
        <ul className="font-bold text-blueInk list-disc list-inside mt-1">
          <li className="pb-2">You care about the planet</li>
          <li className="pb-2">
            You do not pay any transport costs of your employees
          </li>
          <li>
            This service costs you 10% of the monthly total transport
            costs
          </li>
        </ul>
        <button
          id="free"
          key="free"
          group="plans"
          value={choices['free']}
          onClick={activatePlan}
          className={`${
            choices['free']
              ? 'bg-wildStrawberry text-blueInk'
              : 'bg-blueInk text-wildStrawberry'
          } relative flex items-center justify-center py-2 w-full font-bold rounded-md select-none cursor-pointer focus:outline-none`}
        >
          I choose this plan
        </button>
      </div>
      {/* Partial plan */}
      {/* <div className="w-72 h-96 bg-white rounded-md shadow-lg flex flex-col justify-between items-center px-6 py-3 flex-grow-0 flex-shrink-0">
        <h2 className="font-medium text-wildStrawberry text-2xl px-4 py-2">
          Partial
        </h2>
        <div className="w-24">
          <Image
            priority
            alt="Partial image plan"
            src="/images/bird.png"
            layout="intrinsic"
            width={1300}
            height={900}
          ></Image>
        </div>
        <ul className="font-bold text-blueInk list-disc list-inside mt-1">
          <li className="pb-2">You care about the planet</li>
          <li className="pb-2">
            You pay 50% of transport costs of your employees
          </li>
          <li>
            This service costs you 5% of the monthly total transport
            costs
          </li>
        </ul>
        <button
          id="partial"
          key="partial"
          group="plans"
          value={choices['partial']}
          onClick={activatePlan}
          className={`${
            choices['partial']
              ? 'bg-wildStrawberry text-blueInk'
              : 'bg-blueInk text-wildStrawberry'
          } relative flex items-center justify-center py-2 w-full font-bold rounded-md select-none cursor-pointer focus:outline-none`}
        >
          I choose this plan
        </button>
      </div> */}
      {/* Full plan */}
      {/* <div className="w-72 h-96 bg-white rounded-md shadow-lg flex flex-col justify-between items-center px-6 py-3 flex-grow-0 flex-shrink-0">
        <h2 className="font-medium text-wildStrawberry text-2xl px-4 py-2">
          Full
        </h2>
        <div className="w-24">
          <Image
            priority
            alt="Full plan image"
            src="/images/cyborg-bird.png"
            layout="intrinsic"
            width={1500}
            height={900}
          ></Image>
        </div>
        <ul className="font-bold text-blueInk list-disc list-inside mt-1">
          <li className="pb-2">
            You care about your employees and the planet
          </li>
          <li className="pb-2">
            You pay 100% of transport costs of your employees
          </li>
          <li>
            This service costs you 1% of the monthly total transport
            costs
          </li>
        </ul>
        <button
          id="full"
          key="full"
          group="plans"
          value={choices['full']}
          onClick={activatePlan}
          className={`${
            choices['full']
              ? 'bg-wildStrawberry text-blueInk'
              : 'bg-blueInk text-wildStrawberry'
          } relative flex items-center justify-center py-2 w-full font-bold rounded-md select-none cursor-pointer focus:outline-none`}
        >
          I choose this plan
        </button>
      </div> */}
      {/* Hidden input with chosen plan value */}
      <input id="chosenPlan" type="hidden" />
    </>
  );
}
