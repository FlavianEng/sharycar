import React from 'react';
import Image from 'next/image';
import Submit from '../components/submitButton';
import { useIsNewMember, useUser } from '../lib/hooks';
import { useState } from 'react';
import Router from 'next/router';
import { Magic } from 'magic-sdk';

const SignIn = () => {
  const user = useUser();

  // useIsNewMember(user);

  // TODO : Redirect to 1stVisit if new, else redirect to dashboard
  // useUser({ redirectTo: '/', redirectIfFound: false });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const body = {
      email: e.currentTarget.email.value,
    };

    try {
      const magic = new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
      );
      const didToken = await magic.auth.loginWithMagicLink({
        email: body.email,
      });
      // eslint-disable-next-line no-undef
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        // Router.push('/');
        // TODO: Detect if new member
        alert('Logged');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

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
              <Submit
                label="Sign in"
                onSubmit={handleSubmit}
                errorMessage={errorMsg}
              ></Submit>
              {/* Debug auth */}
              {user && (
                <>
                  <p>Currently logged in as:</p>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
