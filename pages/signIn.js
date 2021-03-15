import React from 'react';
import Image from 'next/image';
import Submit from '../components/submitButton';

const SignIn = () => {
  const helloWord = () => {
    console.log('Bien joué ma petite tortue !!');
  };

  return (
    <div>
      <div className="w-full h-full overflow-hidden fixed -z-1 bottom-48 md:bottom-72 lg:bottom-0">
        <Image
          priority
          alt="background"
          src="/images/signInBack.png"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      <div className="container">
        <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 w-screen h-screen">
          <div className="flex flex-col justify-start align-center">
            {/* Square 1 */}
            <div className="transform -translate-y-16 md:transform md:-translate-y-36 lg:transform lg:transform-y-0">
              <Image
                priority
                alt="Authentification"
                src="/images/auth.png"
                layout="responsive"
                width={912}
                height={911}
              />
            </div>
          </div>
          <div className="z-10 flex flex-col place-content-evenly items-center mb-14 md:mb-0 lg:items-end xl:mr-8 2xl:mr-32">
            {/* Square 2 */}
            <h2 className="mt-20 md:mt-24 lg:mt-0 p-4 pt-2 font-medium text-4xl md:text-5xl lg:text-6xl text-blueInk rounded-t-md bg-white">
              Sign in
            </h2>
            <div className="flex flex-col rounded-md bg-white">
              {/* Form part */}
              <label
                htmlFor="email"
                className="block text-xl font-bold text-blueInk"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-md">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-1 focus:ring-blueInk focus:border-blueInk block w-80 py-3 px-4 border border-gray-300 rounded-md"
                  placeholder="bobleponge@example.com"
                />
              </div>
              <Submit label="Sign in" onClick={helloWord}></Submit>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
