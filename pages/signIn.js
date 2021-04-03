import React from 'react';
import Image from 'next/image';
import Submit from '../components/submitButton';
// import { useUser } from '../lib/hooks';
import { useState } from 'react';
import Router from 'next/router';
import { Magic } from 'magic-sdk';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function isNewMember(email, token) {
    try {
      const result = await fetch(`/api/user?email=${email}`, {
        method: 'GET',
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          setErrorMsg('Response not ok');
          console.error('Response not ok', response);
          return;
        }
      });

      console.log('IsNewMemberRes', result);
      setIsLoading(false);

      if (result && result.data) {
        return result && result.data
          ? Router.push(`${result.data.role}/dashboard`)
          : Router.push('/firstVisit');
      }
      setErrorMsg('Unable to reach the server, please retry later !');
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.message);
    }
  }

  // Debug auth
  // const user = useUser();

  // TODO: Redirect if not login - Keeping for soon
  // useUser({ redirectTo: '/', redirectIfFound: false });

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (errorMsg) {
      setErrorMsg('');
      setIsLoading(false);
    }

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
        isNewMember(body.email, didToken);
      } else {
        setIsLoading(false);
        throw new Error(await res.text());
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.message);
      throw new Error('formSubmitError', error);
    }
  }

  return (
    <div className="lg:overflow-hidden">
      <div className="w-full h-full fixed -z-1 bottom-48 md:bottom-72 lg:bottom-0">
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
                label="Sign in / Register"
                onSubmit={handleSubmit}
                errorMessage={errorMsg}
                isLoading={isLoading}
              ></Submit>
              {/* Debug auth */}
              {/* {user && (
                <>
                  <p>Currently logged in as:</p>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
