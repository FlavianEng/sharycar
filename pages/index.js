/* eslint-disable no-unused-vars */
import Head from 'next/head';
import Image from 'next/image';
import Button from '../components/button';

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Sharycar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-rows-2 grid-cols-2 w-screen h-screen">
        <div className="w-screen h-screen overflow-hidden fixed -z-1 transform -scale-y-1">
          <Image
            alt="background"
            src="/images/indexBack.png"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="col-auto col-start-1 row-start-1">
          <Image
            alt="futuristic car"
            src="/images/voot.png"
            layout="responsive"
            width={912}
            height={911}
          />
        </div>
        <div className="flex flex-col justify-start">
          <h1 className="flex-grow text-center md:text-right p-4 text-2xl md:text-4xl font-medium text-wildStrawberry">
            Sharycar
          </h1>
          <h2 className="ml-2 md:m-0 text-2xl md:text-4xl lg:text-5xl 2xl:text-7xl text-right font-medium p-4 text-blueInk">
            Find your route and get on board
          </h2>
        </div>
        <div></div>
        <div className="row-start-2 col-span-2 lg:row-start-auto lg:col-auto flex justify-center items-center">
          <Button buttonLabel="Sign in" linkTarget="signIn" />
        </div>
      </div>
    </div>
  );
}
