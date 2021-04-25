import React from 'react';
import Image from 'next/image';
import Button from '../components/button';
import Head from 'next/head';

export default function Error() {
  return (
    <>
      <Head>
        <title>Sharycar</title>
      </Head>
      <div className="w-screen h-screen bg-registerBack bg-no-repeat">
        <div className="flex flex-col h-screen-95 justify-around items-center px-10 pt-4 pb-10 md:p-20">
          <h2 className="text-caribbeanGreen text-3xl md:text-6xl lg:text-7xl">
            Look ma ! This is broken !
          </h2>
          <div className="text-wildStrawberry font-bold text-xl md:text-2xl lg:text-4xl mt-10 text-center">
            <p className="">*Lying* It&apos;s perfectly normal !</p>
            <p className="text-xs text-wildStrawberry-dark p-4 pb-0">
              (Maybe the developer was terrible -- I bet on that)
            </p>
          </div>
          <div className="w-10/12 lg:w-1/4">
            <Image
              priority
              key="errorImg"
              alt="Error image"
              src="/images/error.png"
              layout="intrinsic"
              width={912}
              height={911}
            ></Image>
          </div>
          <Button
            linkTarget={'/'}
            buttonLabel="Back to home page"
          ></Button>
        </div>
      </div>
    </>
  );
}
