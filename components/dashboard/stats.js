import React from 'react';
import Image from 'next/image';

export default function Stats({ statName, statValue }) {
  return (
    <div className="flex flex-col w-72 lg:w-96 rounded-md items-center m-4 bg-blueInk">
      {/* Header */}
      <div className="flex flex-col w-full p-2 justify-center items-center text-lg rounded-t-md">
        <div className="flex w-full px-2 items-center">
          <h2 className={'font-medium mx-auto text-caribbeanGreen'}>
            {statName || 'Statistic'}
          </h2>
          <h2
            className={'font-medium mx-auto pl-4 text-wildStrawberry'}
          >
            {statValue || 'NaN'}
          </h2>
        </div>
      </div>

      <span className="h-0.5 w-full bg-caribbeanGreen mb-2" />
      <div className="flex flex-col items-center p-4">
        <div className="w-11/12">
          <Image
            alt="Statistic"
            src="/images/fakeStat.png"
            layout="intrinsic"
            width={544}
            height={188}
          />
        </div>
      </div>
    </div>
  );
}
