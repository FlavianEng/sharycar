import React from 'react';
import Link from 'next/link';

// EVO : Make this element more flexible
export default function Button({ buttonLabel, linkTarget }) {
  return (
    <Link href={linkTarget}>
      <div className="cursor-pointer flex justify-center items-center text-xl md:text-2xl mt-2 lg:text-3xl h-10 lg:h-12 w-80 text-center rounded-md bg-blueInk">
        <a className="font-semibold text-caribbeanGreen">
          {buttonLabel}
        </a>
      </div>
    </Link>
  );
}
