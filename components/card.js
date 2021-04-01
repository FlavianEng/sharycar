import React from 'react';
import Image from 'next/image';

export default function Card({
  planName,
  imgSrc,
  content,
  specialStyle,
  imgHeight,
  imgWidth,
}) {
  return (
    <>
      <div
        className={`w-72 h-96 bg-white rounded-md shadow-lg flex flex-col justify-between items-center px-6 py-3 flex-grow-0 flex-shrink-0 ${specialStyle}`}
      >
        <h2 className="font-medium text-wildStrawberry text-2xl px-4 py-2">
          {planName || 'PlanName'}
        </h2>
        <div className="w-24">
          <Image
            priority
            alt={`${planName} image`}
            src={imgSrc}
            layout="intrinsic"
            width={imgWidth}
            height={imgHeight}
          ></Image>
        </div>
        {content}
        {/* TODO: Create a componant from the button that can be found in component plan.js */}
      </div>
    </>
  );
}
