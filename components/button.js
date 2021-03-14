/* eslint-disable no-unused-vars */
import Link from 'next/link';

// TODO : Make this element more flexible
export default function Button({ buttonLabel, linkTarget }) {
  return (
    <div className="cursor-pointer flex justify-center align-center text-xl md:text-2xl mt-2 lg:text-3xl h-10 lg:h-12 w-80 text-center rounded-2xl bg-blueInk">
      <Link href={linkTarget}>
        <a className="font-semibold text-caribbeanGreen self-center">
          {buttonLabel}
        </a>
      </Link>
    </div>
  );
}
